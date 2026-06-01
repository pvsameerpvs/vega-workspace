import os
import re

# Map of placeholder URLs to local paths
# Format: (regex_pattern, replacement)

replacements = [
    # Hero slides
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-1", "/images/hero/slide-1.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-2", "/images/hero/slide-2.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-3", "/images/hero/slide-3.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=Hero\\+Slide\\+1", "/images/hero/slide-1.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=Hero\\+Slide\\+2", "/images/hero/slide-2.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=Hero\\+Slide\\+3", "/images/hero/slide-3.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=Hero\\+Slide\\+4", "/images/hero/slide-4.jpg"),

    # Hero slides in frontend
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-1", "/images/hero/slide-1.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-2", "/images/hero/slide-2.jpg"),
    ("https://placehold.co/1600x800/1F3A93/FFD400\\?text=hero-3", "/images/hero/slide-3.jpg"),

    # Categories
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=camp-furniture", "/images/categories/camp-furniture.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=metal-barriers", "/images/categories/metal-barriers.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=queue-barriers", "/images/categories/queue-barriers.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=office-furniture", "/images/categories/office-furniture.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=flags-poles", "/images/categories/flags-poles.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=hospitality", "/images/categories/hospitality.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=waste-bins", "/images/categories/waste-bins.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=plastic-furniture", "/images/categories/plastic-furniture.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=camp-furniture", "/images/categories/camp-furniture.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=metal-barriers", "/images/categories/metal-barriers.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=queue-barriers", "/images/categories/queue-barriers.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=office-furniture", "/images/categories/office-furniture.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=flags-poles", "/images/categories/flags-poles.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=hospitality", "/images/categories/hospitality.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=waste-bins", "/images/categories/waste-bins.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=plastic-furniture", "/images/categories/plastic-furniture.jpg"),

    # Products main images
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Bunk\\+Bed", "/images/products/bunk-bed-heavy-duty.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Bunk\\+Bed\\+Heavy\\+Duty", "/images/products/bunk-bed-heavy-duty.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Single\\+Bed", "/images/products/single-bed-standard.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Single\\+Bed\\+Standard", "/images/products/single-bed-standard.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=mattress", "/images/products/foam-mattress-4-inch.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Foam\\+Mattress", "/images/products/foam-mattress-4-inch.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=locker", "/images/products/steel-locker-2-door.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Steel\\+Locker", "/images/products/steel-locker-2-door.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=queue-barrier", "/images/products/retractable-queue-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Retractable\\+Barrier", "/images/products/retractable-queue-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=double-belt", "/images/products/double-belt-queue-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Double\\+Belt\\+Barrier", "/images/products/double-belt-queue-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=vip-pole", "/images/products/vip-pole-gold-2m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=VIP\\+Pole", "/images/products/vip-pole-gold-2m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=VIP\\+Pole\\+Gold", "/images/products/vip-pole-gold-2m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=crowd-barrier", "/images/products/crowd-control-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Crowd\\+Control\\+Barrier", "/images/products/crowd-control-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=sign-board", "/images/products/sign-board-stand-a3.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Sign\\+Board", "/images/products/sign-board-stand-a3.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Sign\\+Board\\+A3", "/images/products/sign-board-stand-a3.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=office-desk", "/images/products/executive-office-desk.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Executive\\+Desk", "/images/products/executive-office-desk.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=office-chair", "/images/products/ergonomic-office-chair.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Ergonomic\\+Chair", "/images/products/ergonomic-office-chair.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=flag-pole", "/images/products/flag-pole-gold-6m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Flag\\+Pole", "/images/products/flag-pole-gold-6m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Flag\\+Pole\\+Gold", "/images/products/flag-pole-gold-6m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=gas-burner", "/images/products/gas-burner-single-head.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Gas\\+Burner", "/images/products/gas-burner-single-head.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=plastic-chair", "/images/products/plastic-chair-heavy-duty.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Plastic\\+Chair", "/images/products/plastic-chair-heavy-duty.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=dining-table", "/images/products/dining-table-6-seater.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Dining\\+Table", "/images/products/dining-table-6-seater.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Dining\\+Table\\+6\\+Seater", "/images/products/dining-table-6-seater.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Custom\\+Logo\\+Barrier", "/images/products/custom-logo-belt-barrier.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Chrome\\+VIP\\+Pole", "/images/products/chrome-vip-pole-2m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Chrome\\+Pole", "/images/products/chrome-vip-pole-2m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Belt\\+Cassette", "/images/products/belt-cassette-replacement.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Cassette", "/images/products/belt-cassette-replacement.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=File\\+Cabinet", "/images/products/file-cabinet-4-drawer.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Meeting\\+Table", "/images/products/meeting-table-oval.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Custom\\+Flag", "/images/products/custom-flag-uae.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Flag", "/images/products/custom-flag-uae.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Industrial\\+Bin", "/images/products/industrial-waste-bin-120l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Industrial\\+Bin\\+120L", "/images/products/industrial-waste-bin-120l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Office\\+Bin", "/images/products/office-waste-bin-30l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Office\\+Bin\\+30L", "/images/products/office-waste-bin-30l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Plastic\\+Table", "/images/products/plastic-table-round-4ft.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Plastic\\+Table\\+Round", "/images/products/plastic-table-round-4ft.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Storage\\+Cabinet", "/images/products/plastic-storage-cabinet.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Banquet\\+Table", "/images/products/banquet-table-rectangle.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Window\\+AC", "/images/products/window-ac-unit-1-5-ton.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Smart\\+TV", "/images/products/smart-tv-55-inch.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Smart\\+TV\\+55", "/images/products/smart-tv-55-inch.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Outdoor\\+Bin", "/images/products/outdoor-waste-bin-80l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Outdoor\\+Bin\\+80L", "/images/products/outdoor-waste-bin-80l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Workstation", "/images/products/workstation-desk-4-person.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Workstation\\+4\\+Person", "/images/products/workstation-desk-4-person.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Commercial\\+Fridge", "/images/products/refrigerator-commercial-500l.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Flag\\+Pole\\+Silver", "/images/products/flag-pole-silver-4m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Silver\\+Pole", "/images/products/flag-pole-silver-4m.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Thermal\\+Blanket", "/images/products/blanket-thermal-2kg.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Soft\\+Pillow", "/images/products/pillow-soft-standard.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Cotton\\+Bedsheet", "/images/products/bedsheet-cotton-single.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=4\\+Door\\+Locker", "/images/products/steel-locker-4-door.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Red\\+Velvet\\+Rope", "/images/products/vip-rope-red-velvet.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Info\\+Stand\\+A4", "/images/products/information-stand-a4.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Bunk\\+Bed\\+Standard", "/images/products/bunk-bed-standard-28kg.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Premium\\+Mattress", "/images/products/foam-mattress-6-inch.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Mattress\\+6\\+Inch", "/images/products/foam-mattress-6-inch.jpg"),

    # Popular ranges
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Bunk\\+Bed", "/images/products/bunk-bed-heavy-duty.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Mattresses", "/images/products/foam-mattress-4-inch.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Mattresses\\+and\\+Bedding", "/images/products/foam-mattress-4-inch.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Office\\+Furniture", "/images/categories/office-furniture.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Plastic\\+Furniture", "/images/categories/plastic-furniture.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Hospitality", "/images/categories/hospitality.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Queue\\+Barriers", "/images/categories/queue-barriers.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Flags\\+\\%26\\+Poles", "/images/categories/flags-poles.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Flags\\+\\%26\\+Poles", "/images/categories/flags-poles.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Waste\\+Bins", "/images/categories/waste-bins.jpg"),

    # Blog images
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Bulk\\+Camp\\+Furniture", "/images/blog/bulk-camp-furniture.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Queue\\+Barriers\\+Events", "/images/blog/queue-barriers-events.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Office\\+Furniture\\+Trends", "/images/blog/office-furniture-trends.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Labor\\+Camp\\+Guide", "/images/blog/labor-camp-guide.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Flag\\+Pole\\+Installation", "/images/blog/flag-poles-installation.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Waste\\+Management", "/images/blog/waste-management.jpg"),

    # Team
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Faisal", "/images/team/faisal.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Sarah", "/images/team/sarah.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Ahmed", "/images/team/ahmed.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Priya", "/images/team/priya.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Omar", "/images/team/omar.jpg"),
    ("https://placehold.co/400x400/1F3A93/FFD400\\?text=Layla", "/images/team/layla.jpg"),
    ("https://placehold.co/200x200/1F3A93/FFD400\\?text=SA", "/images/team/faisal.jpg"),
    ("https://placehold.co/200x200/1F3A93/FFD400\\?text=PM", "/images/team/sarah.jpg"),
    ("https://placehold.co/200x200/1F3A93/FFD400\\?text=CE", "/images/team/priya.jpg"),
    ("https://placehold.co/200x200/1F3A93/FFD400\\?text=HR", "/images/team/omar.jpg"),
    ("https://placehold.co/200x200/1F3A93/FFD400\\?text=ST", "/images/team/layla.jpg"),

    # Gallery
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Camp\\+Furniture", "/images/categories/camp-furniture.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Queue\\+Barriers", "/images/categories/queue-barriers.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Office\\+Furniture", "/images/categories/office-furniture.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Metal\\+Barriers", "/images/categories/metal-barriers.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Warehouse", "/images/gallery/warehouse-interior.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Delivery\\+Fleet", "/images/gallery/delivery-fleet.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Team", "/images/gallery/vega-team.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Installation", "/images/gallery/installation.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Camp\\+Bunk\\+Beds", "/images/gallery/camp-bunk-beds.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Queue\\+Barriers\\+Airport", "/images/gallery/queue-barriers-airport.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Office\\+Furniture\\+Showroom", "/images/gallery/office-furniture-showroom.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Metal\\+Barriers\\+Event", "/images/gallery/metal-barriers-event.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Warehouse\\+Interior", "/images/gallery/warehouse-interior.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Delivery\\+Truck", "/images/gallery/delivery-fleet.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Vega\\+Team", "/images/gallery/vega-team.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Installation\\+Team", "/images/gallery/installation.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=VIP\\+Poles\\+Hotel", "/images/gallery/vip-poles-hotel.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Flag\\+Pole\\+Government", "/images/gallery/flag-pole-government.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Camp\\+Dining\\+Area", "/images/gallery/camp-dining-area.jpg"),
    ("https://placehold.co/600x400/1F3A93/FFD400\\?text=Plastic\\+Furniture\\+Outdoor", "/images/gallery/plastic-furniture-outdoor.jpg"),

    # Catalogs
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=CROWN\\+Camp\\+Furniture", "/images/catalogs/crown-camp-furniture.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=CROWN\\+Catalog\\+PDF", "/images/catalogs/crown-camp-furniture.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Alpha\\+Barrier", "/images/catalogs/alpha-barrier.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Alpha\\+Barrier\\+PDF", "/images/catalogs/alpha-barrier.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Camp\\+Brochure", "/images/catalogs/camp-furniture-brochure.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Camp\\+Brochure\\+PDF", "/images/catalogs/camp-furniture-brochure.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Office\\+Furniture", "/images/catalogs/vega-office-furniture.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Office\\+Catalog\\+PDF", "/images/catalogs/vega-office-furniture.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Hospitality\\+Guide", "/images/catalogs/hospitality-guide.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Hospitality\\+PDF", "/images/catalogs/hospitality-guide.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Waste\\+Bins", "/images/catalogs/waste-bins.jpg"),
    ("https://placehold.co/400x540/e5e7eb/1f2937\\?text=Waste\\+Bins\\+PDF", "/images/catalogs/waste-bins.jpg"),

    # About/warehouse
    ("https://placehold.co/800x600/e5e7eb/1f2937\\?text=Vega\\+Warehouse", "/images/gallery/warehouse-interior.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Fleet\\+Photo", "/images/gallery/delivery-fleet.jpg"),
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=Team\\+Photo", "/images/gallery/vega-team.jpg"),
    ("https://placehold.co/800x600/e5e7eb/1f2937\\?text=Delivery\\+Across\\+UAE", "/images/gallery/delivery-fleet.jpg"),
    ("https://placehold.co/800x600/e5e7eb/1f2937\\?text=Quality\\+Products", "/images/gallery/warehouse-interior.jpg"),

    # Blog detail
    ("https://placehold.co/800x450/e5e7eb/1f2937\\?text=.*", "/images/blog/placeholder.jpg"),
]

files_to_update = [
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/lib/data/products.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/lib/data/home.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/lib/data/content.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/products.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/categories.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/content.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/homepage.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/settings.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/packages/db/src/mock/users.ts",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/TrustSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/QualitySection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/DeliverySection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/HeroSlider.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/PopularCategoriesSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/AboutStatsSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/CategoriesSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/IndustriesSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/ReviewsSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/FaqSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/CtaSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/sections/LeadFormSection.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/about-us/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/blog/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/blog/[slug]/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/careers/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/gallery/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/catalog/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/contact-us/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/products/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/products/[slug]/page.tsx",
    "/home/sameer/Documents/Project/justsearch-project/vega-workspace/apps/vega-frontend/app/privacy-policy/page.tsx",
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated: {filepath}")

print("\nAll image paths updated to local files!")
