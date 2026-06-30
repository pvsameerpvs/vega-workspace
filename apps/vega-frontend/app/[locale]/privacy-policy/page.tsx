import { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | Vega UAE",
  description: "Vega privacy policy and data protection statement.",
};

export default function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";

  return (
    <main className="pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "قانوني" : "Legal"}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{isAR ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
          <p className="mt-6 text-lg text-slate-500">
            {isAR ? "آخر تحديث: يونيو 2025" : "Last updated: June 2025"}
          </p>
        </div>

        <div className="space-y-12 text-lg text-slate-500 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{isAR ? "1. مقدمة" : "1. Introduction"}</h2>
            <p>
              {isAR
                ? "تلتزم فيجا بحماية خصوصيتك. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية عند زيارة موقعنا أو استخدام خدماتنا."
                : "Vega is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{isAR ? "2. المعلومات التي نجمعها" : "2. Information We Collect"}</h2>
            <p>
              {isAR
                ? "نحن نجمع معلومات مثل اسمك، وبريدك الإلكتروني، ورقم هاتفك، وتفاصيل شركتك عند إرسال استفسارات أو طلب عروض أسعار من خلال موقعنا."
                : "We collect information such as your name, email, phone number, and company details when you submit enquiries or request quotes through our website."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{isAR ? "3. كيف نستخدم معلوماتك" : "3. How We Use Your Information"}</h2>
            <p>
              {isAR
                ? "يتم استخدام معلوماتك فقط للرد على استفساراتك، وتقديم خدماتنا، وتحسين تجربة موقعنا."
                : "Your information is used solely to respond to your enquiries, provide our services, and improve our website experience."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{isAR ? "4. أمان البيانات" : "4. Data Security"}</h2>
            <p>
              {isAR
                ? "ننفذ تدابير أمان مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف."
                : "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{isAR ? "5. تواصل معنا" : "5. Contact Us"}</h2>
            <p>
              {isAR
                ? "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية تعاملنا مع بياناتك، يرجى التواصل معنا على Sales@thevegauae.com أو الاتصال بـ +971 56 735 1095."
                : "If you have any questions about this privacy policy or how we handle your data, please contact us at Sales@thevegauae.com or call +971 56 735 1095."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
