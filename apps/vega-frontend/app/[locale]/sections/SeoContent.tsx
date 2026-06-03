interface SeoContentProps {
  locale?: string;
}

export function SeoContent({ locale = "en" }: SeoContentProps) {
  const isAR = locale === "ar";

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-lg font-bold text-slate-900 mb-4 font-display">
          {isAR
            ? "اشتري أثاث، حواجز، ومستلزمات صناعية أونلاين من فيجا الإمارات"
            : "Buy Furniture, Barriers & Industrial Supplies Online at Vega UAE"}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          {isAR
            ? "فيجا هي مورد B2B موثوق للأثاث المتين، ومعدات التحكم في الحشود، والمستلزمات الصناعية في جميع أنحاء الإمارات. نحن نخدم شركات البناء، ومخيمات العمال، والجهات الحكومية، والمكاتب المؤسسية بحلول موثوقة وفعالة من حيث التكلفة. من أسرة المخيمات الثقيلة إلى أعمدة الأعلام الألومنيوم المؤكسدة، كتالوجنا مبني لمتطلبات الشركات الإماراتية الواقعية."
            : "Vega is a trusted B2B supplier of durable furniture, crowd control equipment, and industrial supplies across the UAE. We serve construction companies, labor camps, government entities, and corporate offices with reliable, cost-effective solutions. From heavy-duty camp bunk beds to anodized aluminum flag poles, our catalog is built for the demands of real-world UAE businesses."}
        </p>

        <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
          {isAR
            ? "طور مساحتك بأثاث B2B متميز"
            : "Upgrade Your Space with Premium B2B Furniture"}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          {isAR
            ? "يجب أن تعكس مساحة العمل قيم عملك. مع فيجا، استكشف مجموعة واسعة من الأثاث الحديث الذي يوازن بين الجمالية والفائدة. اختر من بين كراسي المكتب المريحة، وأسرة المخيمات الثقيلة، وحواجز التحكم في الحشود المعدنية، وأعمدة الأعلام المتميزة — كلها مختارة لقطاعات البناء والضيافة والتجارة في الإمارات."
            : "A workspace should reflect your business values. With Vega, explore a wide range of modern furniture that balances aesthetics with utility. Choose from ergonomic office chairs, heavy-duty camp bunk beds, metal crowd control barriers, and premium flag poles — all curated for UAE construction, hospitality, and commercial sectors."}
        </p>

        <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
          {isAR ? "المجموعات المتميزة من فيجا الإمارات" : "Premium Collections by Vega UAE"}
        </h3>
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "أثاث المخيمات والسكن العمال" : "Camp & Labor Housing Furniture"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "إعدادات مخيمات كاملة تشمل أسرة فولاذية بطابقين، وأسرة مفردة، ومراتب من الفوم، وخزائن فولاذية، وطاولات طعام، وكراسي بلاستيكية. مبنية لسكن العمال وإسكان العمال في جميع أنحاء الإمارات."
                : "Complete camp setups including steel bunk beds, single beds, foam mattresses, steel lockers, dining tables, and plastic chairs. Built for labor accommodation and worker housing across the UAE."}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "أثاث المكاتب" : "Office Furniture"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "مكاتب حديثة، وكراسي مريحة، وطاولات اجتماعات تنفيذية، وخزائن ملفات، ومحطات عمل معيارية مصممة لأماكن العمل الإماراتية المنتجة."
                : "Modern office desks, ergonomic chairs, executive meeting tables, file cabinets, and modular workstations designed for productive UAE workplaces."}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "الحواجز وإدارة الحشود" : "Barriers & Crowd Control"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "حواجز معدنية مجلفنة للتحكم في الحشود، وحواجز إدارة الطوابير، وأعمدة السجادة الحمراء للVIP، وأعمدة حزام قابل للسحب، وحلول السلامة المرورية للفعاليات والحفلات والمواقع الإنشائية."
                : "Galvanized metal crowd control barriers, queue management barriers, VIP red carpet poles, retractable belt stanchions, and traffic safety solutions for events, concerts, and construction sites."}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "الأعلام، أعمدة الأعلام، والرموز الوطنية" : "Flags, Flag Poles & National Symbols"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "أعمدة أعلام ألومنيوم مؤكسدة متميزة، وقواعد جدارية، وأعلام مطبوعة مخصصة للمباني الحكومية، والمكاتب المؤسسية، والعقارات التجارية في جميع أنحاء الإمارات."
                : "Premium anodized aluminum flag poles, wall-mounted brackets, and custom printed flags for government buildings, corporate offices, and commercial properties across the UAE."}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "الأثاث البلاستيكي وحلول الطعام" : "Plastic Furniture & Dining Solutions"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "كراسي بلاستيكية متينة، وطاولات كافتيريا، وطاولات طعام خارجية لمخيمات العمال، والمدارس، وبيوت الضيافة. مقاومة للعوامل الجوية وسهلة الصيانة."
                : "Heavy-duty plastic chairs, cafeteria tables, and outdoor dining sets for labor camps, schools, and hospitality venues. Weather-resistant and easy to maintain."}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1F3A93] mb-1">
              {isAR ? "المعدات الصناعية والمطبخية" : "Industrial & Kitchen Equipment"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAR
                ? "مواقد غاز تجارية، ومواقد طهي، وإكسسوارات مطبخ لمخيمات العمال، وخدمات التموين، والمطابخ الصناعية في الإمارات."
                : "Commercial gas burners, cooking ranges, and kitchen accessories for labor camps, catering services, and industrial kitchens in the UAE."}
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
          {isAR ? "أنشئ مساحتك المثالية مع فيجا" : "Create Your Perfect Space With Vega"}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          {isAR
            ? "الشراكة مع فيجا تعني الاستثمار في أثاث ومستلزمات صناعية عالية الجودة مصممة للاستخدام الواقعي. من أسرة المخيمات ومواقد الغاز إلى محطات عمل المكاتب وحواجز التحكم في الحشود، مجموعتنا الواسعة تضمن لك إيجاد الخيار الأمثل لمشروعك وميزانيتك وجدولك الزمني."
            : "Partnering with Vega means investing in quality furniture and industrial supplies crafted for real-world use. From camp bunk beds and gas burners to office workstations and crowd control barriers, our wide range ensures you find the perfect fit for your project, budget, and timeline."}
        </p>

        <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
          {isAR ? "لماذا فيجا من بين أفضل موردي B2B في الإمارات" : "Why Vega is Among the Top B2B Suppliers in UAE"}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {isAR
            ? "بخبرة تزيد عن 15 عاماً ومستودع يزيد مساحته عن 10,000 قدم مربع في الشارقة، استحقت فيجا مكانها بين أفضل موردي B2B في الإمارات. نحن نجمع بين التصميم المبتكر، والمواد المتينة، والخدمة الموثوقة بعد البيع لنسلم في الوقت المحدد، في كل مرة. سواء كنت بحاجة إلى أثاث مخيمات بالجملة، أو تجهيزات مكاتب، أو حواجز فعاليات، نحن نفهم ما تحتاجه الشركات الإماراتية."
            : "With over 15 years of experience and a 10,000+ sq ft warehouse in Sharjah, Vega has earned its place among the top B2B suppliers in UAE. We combine innovative design, durable materials, and reliable after-sales service to deliver on time, every time. Whether you need bulk camp furniture, office fit-outs, or event barriers, we understand what UAE businesses need."}
        </p>
      </div>
    </section>
  );
}
