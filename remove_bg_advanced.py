import sys
import numpy as np
from rembg import remove
from PIL import Image, ImageEnhance

input_path = "C:\\Users\\Xgm\\Desktop\\APPWBP\\ChatGPT Image 7 de ago. de 2026, 07_58_58.png"
output_path = "public/originkit/hero-11/hero-portrait.png"

try:
    print(f"Loading {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Advanced background removal with alpha matting to eat into edges
    print("Removing background using rembg (with alpha matting)...")
    out_img = remove(
        img,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=15
    )
    
    # 2. Green spill suppression
    print("Suppressing green spill...")
    arr = np.array(out_img).astype(np.float32) / 255.0
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Where green is greater than the average of red and blue, reduce it
    avg_rb = (r + b) / 2.0
    # Create a mask where green is strictly greater than avg of R and B
    green_mask = g > avg_rb
    
    # Reduce green to the average of red and blue in those areas
    g = np.where(green_mask, avg_rb, g)
    
    # Recombine
    arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3] = r, g, b, a
    out_img = Image.fromarray((arr * 255).astype(np.uint8), "RGBA")
    
    # 3. Enhance visibility as before
    print("Enhancing visibility...")
    enhancer = ImageEnhance.Brightness(out_img)
    out_img = enhancer.enhance(1.2)
    
    enhancer2 = ImageEnhance.Contrast(out_img)
    out_img = enhancer2.enhance(1.1)
    
    out_img.save(output_path, "PNG")
    print(f"Saved processed image to {output_path}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
