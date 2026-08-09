import sys
from rembg import remove
from PIL import Image, ImageEnhance

input_path = "public/originkit/hero-11/hero-portrait.png"
output_path = "public/originkit/hero-11/hero-portrait.png"

try:
    print(f"Loading {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    
    print("Removing background using rembg...")
    out_img = remove(img)
    
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
