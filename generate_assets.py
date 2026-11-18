import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("mobile/assets", exist_ok=True)

# 1. Icon (1024x1024)
icon = Image.new("RGBA", (1024, 1024), "#0F172A")
draw = ImageDraw.Draw(icon)
# Draw rounded rectangle in center
draw.rounded_rectangle([256, 256, 768, 768], radius=120, fill="#2563EB")
# Draw letter 'C' approximation or text
try:
    font = ImageFont.truetype("arial.ttf", 360)
except:
    font = ImageFont.load_default()
draw.text((512, 512), "C", font=font, fill="#FFFFFF", anchor="mm")
icon.save("mobile/assets/icon.png")

# 2. Adaptive Icon (1024x1024)
adaptive = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
draw_ad = ImageDraw.Draw(adaptive)
draw_ad.rounded_rectangle([256, 256, 768, 768], radius=120, fill="#2563EB")
draw_ad.text((512, 512), "C", font=font, fill="#FFFFFF", anchor="mm")
adaptive.save("mobile/assets/adaptive-icon.png")

# 3. Splash Screen (1242x2436)
splash = Image.new("RGBA", (1242, 2436), "#0F172A")
draw_sp = ImageDraw.Draw(splash)
draw_sp.rounded_rectangle([421, 950, 821, 1350], radius=100, fill="#2563EB")
draw_sp.text((621, 1150), "C", font=font, fill="#FFFFFF", anchor="mm")
try:
    font_sub = ImageFont.truetype("arial.ttf", 72)
except:
    font_sub = ImageFont.load_default()
draw_sp.text((621, 1450), "CENDEKIA", font=font_sub, fill="#FFFFFF", anchor="mm")
splash.save("mobile/assets/splash.png")

# 4. Favicon (48x48)
fav = icon.resize((48, 48), Image.Resampling.LANCZOS)
fav.save("mobile/assets/favicon.png")

print("All mobile assets created successfully!")
