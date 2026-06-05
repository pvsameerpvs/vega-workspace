"use client";

interface BlogContentProps {
  content: string;
  locale?: string;
}

export function BlogContent({ content, locale = "en" }: BlogContentProps) {
  const isAR = locale === "ar";

  const isHtml = content.trim().startsWith("<") && content.includes("</");

  if (isHtml) {
    return (
      <div
        className="blog-content space-y-6 break-words"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6 break-words">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className={`text-base leading-[1.9] text-slate-600 break-words ${
            i === 0 ? "text-lg font-medium text-slate-700" : ""
          }`}
          dir={isAR ? "rtl" : "ltr"}
        >
          {para}
        </p>
      ))}
    </div>
  );
}
