import os
from PIL import Image
import numpy as np

src_path = r"C:\Users\Xgm\Desktop\APPWBP\ChatGPT Image 7 de ago. de 2026, 07_58_58.png"
dst_png = r"c:\Users\Xgm\Desktop\APPWBP\monitorsmith-main\public\originkit\hero-11\portraits-hero.png"
dst_webp = r"c:\Users\Xgm\Desktop\APPWBP\monitorsmith-main\public\originkit\hero-11\portraits-hero.webp"

img = Image.open(src_path).convert("RGBA")
arr = np.array(img, dtype=np.float32)

r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Measure green dominance over red & blue
diff_r = g - r
diff_b = g - b
diff = np.minimum(diff_r, diff_b)

# Alpha matte generation:
# diff > 30 -> 0 alpha (fully transparent background)
# diff < 5 -> 255 alpha (opaque foreground subject)
alpha = np.clip((35.0 - diff) / 30.0 * 255.0, 0.0, 255.0)

# Advanced Despill Filter:
rb_avg = (r + b) * 0.5
spill_mask = g > rb_avg
g_clean = np.where(spill_mask, rb_avg, g)

# Create clean RGBA image with transparent background
arr[:, :, 0] = r
arr[:, :, 1] = g_clean
arr[:, :, 2] = b
arr[:, :, 3] = alpha

result_rgba = Image.fromarray(np.uint8(np.clip(arr, 0, 255)), "RGBA")

# Save transparent PNG and transparent WEBP
result_rgba.save(dst_png, "PNG")
result_rgba.save(dst_webp, "WEBP", quality=95, lossless=True)

print("Transparent PNG and WebP generated successfully!")
