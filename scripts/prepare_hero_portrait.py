import os
from PIL import Image
import numpy as np

src_path = r"C:\Users\Xgm\Desktop\APPWBP\ChatGPT Image 7 de ago. de 2026, 07_58_58.png"
dst_webp = r"c:\Users\Xgm\Desktop\APPWBP\monitorsmith-main\public\originkit\hero-11\portraits-hero.webp"
dst_png = r"c:\Users\Xgm\Desktop\APPWBP\monitorsmith-main\public\originkit\hero-11\portraits-hero.png"
dst_portrait = r"c:\Users\Xgm\Desktop\APPWBP\monitorsmith-main\public\originkit\hero-11\portrait.png"

img = Image.open(src_path).convert("RGBA")
w, h = img.size
arr = np.array(img, dtype=np.float32)

r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Calculate green dominance
diff_r = g - r
diff_b = g - b
diff = np.minimum(diff_r, diff_b)

# High quality alpha key
alpha = np.clip((32.0 - diff) / 28.0 * 255.0, 0.0, 255.0)

# Despill green reflections from hair and suit edges
rb_avg = (r + b) * 0.5
spill_mask = g > rb_avg
g_clean = np.where(spill_mask, rb_avg, g)

arr[:, :, 0] = r
arr[:, :, 1] = g_clean
arr[:, :, 2] = b
arr[:, :, 3] = alpha

cutout = Image.fromarray(np.uint8(np.clip(arr, 0, 255)), "RGBA")

# Create a 1024x1024 square transparent canvas to match original Originkit square ratio
target_size = 1024
aspect = w / h

# Resize cutout to fit within target_size x target_size
new_h = target_size
new_w = int(new_h * aspect)
resized_cutout = cutout.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Create 1024x1024 square image centered
square_img = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
offset_x = (target_size - new_w) // 2
offset_y = 0
square_img.paste(resized_cutout, (offset_x, offset_y), resized_cutout)

# Save transparent WEBP & PNG for Originkit hero
square_img.save(dst_webp, "WEBP", quality=95, lossless=True)
square_img.save(dst_png, "PNG")
square_img.save(dst_portrait, "PNG")

print(f"Successfully generated 1024x1024 square transparent portrait: {dst_webp}")
