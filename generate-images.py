from PIL import Image, ImageDraw, ImageFont
import os

# Vega brand colors
BLUE = "#1F3A93"
YELLOW = "#FFD400"
WHITE = "#FFFFFF"
GRAY = "#e5e7eb"
DARK = "#1f2937"

BASE = "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/public/images"

# Try to load a font, fallback to default
try:
    font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
except:
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

def draw_text_centered(draw, text, y, font, fill, width):
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    draw.text((x, y), text, font=font, fill=fill)

def create_image(path, w, h, bg_color, text, text_color=WHITE, subtext=None):
    img = Image.new("RGB", (w, h), bg_color)
    draw = ImageDraw.Draw(img)
    # Add a subtle gradient overlay
    for i in range(h):
        alpha = int(50 * (1 - i / h))
        draw.line([(0, i), (w, i)], fill=(0, 0, 0, alpha))
    
    draw_text_centered(draw, text, h // 2 - 40, font_large, text_color, w)
    if subtext:
        draw_text_centered(draw, subtext, h // 2 + 30, font_small, text_color, w)
    
    # Add Vega logo text
    draw.text((w - 180, h - 50), "VEGA UAE", font=font_small, fill=YELLOW)
    
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, quality=90)
    print(f"Created {path}")

# Hero images
hero_slides = [
    ("hero/slide-1.jpg", "Reliable Furniture Solutions", "Camp Furniture, Barriers & Office Supplies"),
    ("hero/slide-2.jpg", "Premium Queue Barriers", "Crowd Control & VIP Poles"),
    ("hero/slide-3.jpg", "Complete Camp Furniture", "Bunk Beds, Mattresses & Dining Sets"),
    ("hero/slide-4.jpg", "Modern Office Furniture", "Desks, Chairs & Workstations"),
]

for path, text, sub in hero_slides:
    create_image(os.path.join(BASE, path), 1600, 800, BLUE, text, WHITE, sub)

# Product images (40 products)
products = [
    ("products/bunk-bed-heavy-duty.jpg", "Bunk Bed Heavy Duty 36kg"),
    ("products/single-bed-standard.jpg", "Single Bed Standard Frame"),
    ("products/foam-mattress-4-inch.jpg", "Foam Mattress 4 Inch"),
    ("products/steel-locker-2-door.jpg", "Steel Locker 2 Door"),
    ("products/retractable-queue-barrier.jpg", "Retractable Queue Barrier"),
    ("products/double-belt-queue-barrier.jpg", "Double Belt Queue Barrier"),
    ("products/vip-pole-gold-2m.jpg", "VIP Pole Gold 2m"),
    ("products/crowd-control-barrier.jpg", "Crowd Control Barrier 2.3m"),
    ("products/sign-board-stand-a3.jpg", "Sign Board Stand A3"),
    ("products/executive-office-desk.jpg", "Executive Office Desk 1.6m"),
    ("products/ergonomic-office-chair.jpg", "Ergonomic Office Chair"),
    ("products/flag-pole-gold-6m.jpg", "Flag Pole Gold 6m"),
    ("products/gas-burner-single-head.jpg", "Gas Burner Single Head"),
    ("products/plastic-chair-heavy-duty.jpg", "Plastic Chair Heavy Duty"),
    ("products/dining-table-6-seater.jpg", "Dining Table 6-Seater"),
    ("products/custom-logo-belt-barrier.jpg", "Custom Logo Belt Barrier"),
    ("products/chrome-vip-pole-2m.jpg", "Chrome VIP Pole 2m"),
    ("products/belt-cassette-replacement.jpg", "Belt Cassette Replacement"),
    ("products/file-cabinet-4-drawer.jpg", "File Cabinet 4 Drawer"),
    ("products/meeting-table-oval.jpg", "Meeting Table Oval 2.4m"),
    ("products/custom-flag-uae.jpg", "Custom Flag UAE 2x3m"),
    ("products/industrial-waste-bin-120l.jpg", "Industrial Waste Bin 120L"),
    ("products/office-waste-bin-30l.jpg", "Office Waste Bin 30L"),
    ("products/plastic-table-round-4ft.jpg", "Plastic Table Round 4ft"),
    ("products/plastic-storage-cabinet.jpg", "Plastic Storage Cabinet 3 Shelf"),
    ("products/banquet-table-rectangle.jpg", "Banquet Table Rectangle 6ft"),
    ("products/window-ac-unit-1-5-ton.jpg", "Window AC Unit 1.5 Ton"),
    ("products/smart-tv-55-inch.jpg", "Smart TV 55 inch"),
    ("products/outdoor-waste-bin-80l.jpg", "Outdoor Waste Bin 80L"),
    ("products/workstation-desk-4-person.jpg", "Workstation Desk 4 Person"),
    ("products/refrigerator-commercial-500l.jpg", "Refrigerator Commercial 500L"),
    ("products/flag-pole-silver-4m.jpg", "Flag Pole Silver 4m"),
    ("products/blanket-thermal-2kg.jpg", "Blanket Thermal 2kg"),
    ("products/pillow-soft-standard.jpg", "Pillow Soft Standard"),
    ("products/bedsheet-cotton-single.jpg", "Bedsheet Cotton Single"),
    ("products/steel-locker-4-door.jpg", "Steel Locker 4 Door"),
    ("products/vip-rope-red-velvet.jpg", "VIP Rope Red Velvet"),
    ("products/information-stand-a4.jpg", "Information Stand A4"),
    ("products/bunk-bed-standard-28kg.jpg", "Bunk Bed Standard 28kg"),
    ("products/foam-mattress-6-inch.jpg", "Foam Mattress 6 Inch"),
]

for path, text in products:
    create_image(os.path.join(BASE, path), 600, 400, BLUE, text, YELLOW)

# Category images (8 categories)
categories = [
    ("categories/camp-furniture.jpg", "Camp Furniture"),
    ("categories/metal-barriers.jpg", "Metal Barriers"),
    ("categories/queue-barriers.jpg", "Queue Barriers"),
    ("categories/office-furniture.jpg", "Office Furniture"),
    ("categories/flags-poles.jpg", "Flags & Poles"),
    ("categories/hospitality.jpg", "Hospitality Equipment"),
    ("categories/waste-bins.jpg", "Waste Bins"),
    ("categories/plastic-furniture.jpg", "Plastic Furniture"),
]

for path, text in categories:
    create_image(os.path.join(BASE, path), 600, 400, BLUE, text, YELLOW)

# Team images (6 members)
team = [
    ("team/faisal.jpg", "Faisal Mohammed", "General Manager"),
    ("team/sarah.jpg", "Sarah Khan", "Sales Director"),
    ("team/ahmed.jpg", "Ahmed Al-Rashid", "Operations Manager"),
    ("team/priya.jpg", "Priya Sharma", "Product Manager"),
    ("team/omar.jpg", "Omar Hassan", "Warehouse Supervisor"),
    ("team/layla.jpg", "Layla Noor", "Customer Relations"),
]

for path, name, role in team:
    create_image(os.path.join(BASE, path), 400, 400, BLUE, name, WHITE, role)

# Blog images (6 posts)
blogs = [
    ("blog/bulk-camp-furniture.jpg", "Bulk Camp Furniture"),
    ("blog/queue-barriers-events.jpg", "Queue Barriers for Events"),
    ("blog/office-furniture-trends.jpg", "Office Furniture Trends 2025"),
    ("blog/labor-camp-guide.jpg", "Labor Camp Furniture Guide"),
    ("blog/flag-poles-installation.jpg", "Flag Poles Installation"),
    ("blog/waste-management.jpg", "Waste Management Solutions"),
]

for path, text in blogs:
    create_image(os.path.join(BASE, path), 800, 450, BLUE, text, WHITE)

# Gallery images (12 items)
gallery = [
    ("gallery/camp-bunk-beds.jpg", "Camp Bunk Beds"),
    ("gallery/queue-barriers-airport.jpg", "Queue Barriers Airport"),
    ("gallery/office-furniture-showroom.jpg", "Office Furniture Showroom"),
    ("gallery/metal-barriers-event.jpg", "Metal Barriers Event"),
    ("gallery/warehouse-interior.jpg", "Warehouse Interior"),
    ("gallery/delivery-fleet.jpg", "Delivery Fleet"),
    ("gallery/vega-team.jpg", "Vega Team"),
    ("gallery/installation.jpg", "Installation"),
    ("gallery/vip-poles-hotel.jpg", "VIP Poles Hotel"),
    ("gallery/flag-pole-government.jpg", "Flag Pole Installation"),
    ("gallery/camp-dining-area.jpg", "Camp Dining Area"),
    ("gallery/plastic-furniture-outdoor.jpg", "Plastic Furniture Outdoor"),
]

for path, text in gallery:
    create_image(os.path.join(BASE, path), 600, 400, BLUE, text, YELLOW)

# Catalog covers (6 catalogs)
catalogs = [
    ("catalogs/crown-camp-furniture.jpg", "CROWN Catalog"),
    ("catalogs/alpha-barrier.jpg", "Alpha Barrier Catalog"),
    ("catalogs/camp-furniture-brochure.jpg", "Camp Brochure"),
    ("catalogs/vega-office-furniture.jpg", "Office Furniture Catalog"),
    ("catalogs/hospitality-guide.jpg", "Hospitality Guide"),
    ("catalogs/waste-bins.jpg", "Waste Bins Catalog"),
]

for path, text in catalogs:
    create_image(os.path.join(BASE, path), 400, 540, BLUE, text, YELLOW)

print("\nAll images generated successfully!")
