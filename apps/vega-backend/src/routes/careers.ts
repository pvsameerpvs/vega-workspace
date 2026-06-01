import { Router } from "express";
import { db, careers, jobApplications, MOCK_CATEGORIES } from "@vega/db";
import { eq, desc } from "drizzle-orm";

// Mock careers data
const MOCK_CAREERS = [
  {
    id: 1, title: "Sales Executive", titleAr: "مندوب مبيعات", department: "Sales", location: "Dubai, UAE", jobType: "Full-time",
    experienceRequired: "2-3 years in B2B sales", description: "Responsible for B2B sales, client relationship management, and achieving sales targets across the UAE.", descriptionAr: "مسؤول عن مبيعات B2B وإدارة علاقات العملاء.",
    requirements: "Strong communication skills, UAE driving license, experience in furniture or industrial supplies preferred.", requirementsAr: "مهارات تواصل قوية، رخصة قيادة إماراتية، خبرة في الأثاث أو الإمدادات الصناعية.",
    salaryRange: "AED 4,000 - 6,000 + commission", slug: "sales-executive", isActive: true, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
  {
    id: 2, title: "Warehouse Supervisor", titleAr: "مشرف مستودع", department: "Operations", location: "Sharjah, UAE", jobType: "Full-time",
    experienceRequired: "3-5 years in warehouse management", description: "Oversee daily warehouse operations, inventory management, and coordinate with the delivery team.", descriptionAr: "الإشراف على عمليات المستودع اليومية وإدارة المخزون.",
    requirements: "Experience with warehouse management systems, forklift license, team leadership skills.", requirementsAr: "خبرة مع أنظمة إدارة المستودعات، رخصة رافعة شوكية، مهارات قيادة فريق.",
    salaryRange: "AED 5,000 - 7,000", slug: "warehouse-supervisor", isActive: true, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
  {
    id: 3, title: "Delivery Driver", titleAr: "سائق توصيل", department: "Logistics", location: "Dubai, UAE", jobType: "Full-time",
    experienceRequired: "2+ years UAE driving experience", description: "Ensure timely delivery of products across all emirates with proper vehicle maintenance and documentation.", descriptionAr: "ضمان التوصيل في الوقت المناسب عبر جميع الإمارات.",
    requirements: "Valid UAE driving license (light/heavy), knowledge of UAE roads, ability to lift heavy items.", requirementsAr: "رخصة قيادة إماراتية سارية، معرفة طرق الإمارات، القدرة على رفع الأثقال.",
    salaryRange: "AED 3,000 - 4,500", slug: "delivery-driver", isActive: true, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
  {
    id: 4, title: "Content Marketing Specialist", titleAr: "أخصائي تسويق المحتوى", department: "Marketing", location: "Dubai, UAE", jobType: "Full-time",
    experienceRequired: "2+ years in content marketing", description: "Create and manage content for website, blog, social media, and marketing campaigns.", descriptionAr: "إنشاء وإدارة المحتوى للموقع والمدونة ووسائل التواصل الاجتماعي.",
    requirements: "Strong English writing skills, SEO knowledge, experience with social media management.", requirementsAr: "مهارات كتابة إنجليزية قوية، معرفة SEO، خبرة في إدارة وسائل التواصل.",
    salaryRange: "AED 5,000 - 7,000", slug: "content-marketing-specialist", isActive: true, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
  {
    id: 5, title: "Product Photographer", titleAr: "مصور منتجات", department: "Creative", location: "Dubai, UAE", jobType: "Part-time",
    experienceRequired: "1+ years in product photography", description: "Shoot and edit product photos for website, catalog, and marketing materials.", descriptionAr: "تصوير وتحرير صور المنتجات للموقع والكتالوج.",
    requirements: "Portfolio required, experience with studio lighting, proficiency in photo editing software.", requirementsAr: "مطلوب محفظة أعمال، خبرة في إضاءة الاستوديو، إتقان برامج تحرير الصور.",
    salaryRange: "AED 3,000 - 5,000", slug: "product-photographer", isActive: true, createdAt: new Date("2024-06-01"), updatedAt: new Date("2024-06-01"),
  },
];

const MOCK_APPLICATIONS = [
  { id: 1, careerId: 1, fullName: "Ahmed Hassan", email: "ahmed@example.com", phone: "+971 50 123 4567", position: "Sales Executive", experience: "3 years in B2B sales at ABC Trading", cvUrl: "https://placehold.co/400x600/e5e7eb/1f2937?text=CV+Ahmed", message: "Interested in the sales position. I have experience in furniture sales.", status: "new" as const, createdAt: new Date("2024-06-10") },
  { id: 2, careerId: 2, fullName: "Mohammed Ali", email: "mohammed@example.com", phone: "+971 55 987 6543", position: "Warehouse Supervisor", experience: "5 years warehouse management experience", cvUrl: "https://placehold.co/400x600/e5e7eb/1f2937?text=CV+Mohammed", message: "I have forklift license and experience managing teams of 10+.", status: "contacted" as const, createdAt: new Date("2024-06-09") },
  { id: 3, careerId: 1, fullName: "Sarah Khan", email: "sarah@example.com", phone: "+971 56 456 7890", position: "Sales Executive", experience: "2 years in retail sales", cvUrl: "https://placehold.co/400x600/e5e7eb/1f2937?text=CV+Sarah", message: "Looking for a new challenge in B2B sales.", status: "new" as const, createdAt: new Date("2024-06-08") },
];

const router = Router();

router.get("/jobs", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(careers).orderBy(desc(careers.createdAt));
      return res.json(all);
    }
    res.json(MOCK_CAREERS);
  } catch (error) {
    res.json(MOCK_CAREERS);
  }
});

router.get("/applications", async (_req, res) => {
  try {
    if (db) {
      const all = await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
      return res.json(all);
    }
    res.json(MOCK_APPLICATIONS);
  } catch (error) {
    res.json(MOCK_APPLICATIONS);
  }
});

router.post("/applications", async (req, res) => {
  try {
    if (db) {
      const result = await db.insert(jobApplications).values(req.body).returning();
      return res.status(201).json(result[0]);
    }
    res.status(201).json({ ...req.body, id: MOCK_APPLICATIONS.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

export default router;
