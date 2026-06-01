export const MOCK_LEADS = [
  {
    id: 1, name: "Mohammed Al-Farsi", companyName: "Al Farsi Construction", email: "mohammed@alfarsi.ae", phone: "+971 50 123 4567",
    productName: "Bunk Bed Heavy Duty 36kg", sku: "VEGA-CB-001", category: "Camp Furniture", quantity: "50",
    location: "Dubai", message: "Need 50 bunk beds for a new labor camp in Jebel Ali. Delivery required within 1 week.", sourcePage: "/products/camp-furniture",
    status: "new" as const, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
  {
    id: 2, name: "Sarah Johnson", companyName: "Event Masters LLC", email: "sarah@eventmasters.ae", phone: "+971 55 987 6543",
    productName: "VIP Pole Gold 2m", sku: "VEGA-MB-001", category: "Metal Barriers", quantity: "20",
    location: "Abu Dhabi", message: "Need 20 VIP poles with red ropes for a gala event next month. Rental preferred.", sourcePage: "/products/metal-barriers",
    status: "contacted" as const, createdAt: new Date("2024-06-02"), updatedAt: new Date("2024-06-03"),
  },
  {
    id: 3, name: "Rashid Khan", companyName: "Khan Facilities", email: "rashid@khanfacilities.ae", phone: "+971 56 456 7890",
    productName: "Retractable Queue Barrier", sku: "VEGA-QB-001", category: "Queue Barriers", quantity: "30",
    location: "Dubai", message: "Need 30 queue barriers for a new bank branch. Custom logo printing required.", sourcePage: "/products/queue-barriers",
    status: "quotation_sent" as const, createdAt: new Date("2024-06-03"), updatedAt: new Date("2024-06-04"),
  },
  {
    id: 4, name: "Fatima Al-Mansoori", companyName: "Mansoori Real Estate", email: "fatima@mansoori.ae", phone: "+971 54 321 6547",
    productName: "Executive Office Desk 1.6m", sku: "VEGA-OF-001", category: "Office Furniture", quantity: "10",
    location: "Dubai", message: "Looking for 10 executive desks and 10 ergonomic chairs for our new office.", sourcePage: "/products/office-furniture",
    status: "follow_up_required" as const, createdAt: new Date("2024-06-04"), updatedAt: new Date("2024-06-05"),
  },
  {
    id: 5, name: "Ali Hassan", companyName: "Hassan Manpower", email: "ali@hassanmanpower.ae", phone: "+971 52 789 1234",
    productName: "Camp Furniture Package", sku: "N/A", category: "Camp Furniture", quantity: "200",
    location: "Sharjah", message: "Complete camp furniture package for 200 workers. Include beds, mattresses, lockers, dining tables, and chairs.", sourcePage: "/products/camp-furniture",
    status: "new" as const, createdAt: new Date("2024-06-05"), updatedAt: new Date("2024-06-05"),
  },
  {
    id: 6, name: "Emily Chen", companyName: "Green Landscaping", email: "emily@greenlandscaping.ae", phone: "+971 50 567 8901",
    productName: "Outdoor Waste Bin 80L", sku: "VEGA-WB-003", category: "Waste Bins", quantity: "15",
    location: "Dubai", message: "Need 15 outdoor waste bins for a public park project.", sourcePage: "/products/waste-bins",
    status: "closed" as const, createdAt: new Date("2024-06-06"), updatedAt: new Date("2024-06-10"),
  },
  {
    id: 7, name: "Omar Ibrahim", companyName: "Ibrahim Steel", email: "omar@ibrahimsteel.ae", phone: "+971 55 234 5678",
    productName: "Crowd Control Barrier 2.3m", sku: "VEGA-MB-002", category: "Metal Barriers", quantity: "100",
    location: "Abu Dhabi", message: "Need 100 crowd control barriers for a construction site. Rental for 6 months.", sourcePage: "/products/metal-barriers",
    status: "contacted" as const, createdAt: new Date("2024-06-07"), updatedAt: new Date("2024-06-08"),
  },
  {
    id: 8, name: "Layla Noor", companyName: "Noor Events", email: "layla@noorevents.ae", phone: "+971 56 890 1234",
    productName: "Custom Logo Belt Barrier", sku: "VEGA-QB-003", category: "Queue Barriers", quantity: "12",
    location: "Dubai", message: "Need 12 custom barriers with our event logo printed on belts.", sourcePage: "/products/queue-barriers",
    status: "new" as const, createdAt: new Date("2024-06-08"), updatedAt: new Date("2024-06-08"),
  },
  {
    id: 9, name: "David Thomas", companyName: "Thomas Hospitality", email: "david@thomashospitality.ae", phone: "+971 50 345 6789",
    productName: "Banquet Table Rectangle 6ft", sku: "VEGA-HE-001", category: "Hospitality", quantity: "50",
    location: "Dubai", message: "Need 50 banquet tables and 200 plastic chairs for a hotel event.", sourcePage: "/products/hospitality",
    status: "quotation_sent" as const, createdAt: new Date("2024-06-09"), updatedAt: new Date("2024-06-10"),
  },
  {
    id: 10, name: "Aisha Bello", companyName: "Bello Trading", email: "aisha@bellotrading.ae", phone: "+971 54 678 9012",
    productName: "Flag Pole Gold 6m", sku: "VEGA-FP-001", category: "Flags & Poles", quantity: "5",
    location: "Sharjah", message: "Need 5 gold flag poles with custom UAE flags for our new office.", sourcePage: "/products/flags-poles",
    status: "follow_up_required" as const, createdAt: new Date("2024-06-10"), updatedAt: new Date("2024-06-11"),
  },
];
