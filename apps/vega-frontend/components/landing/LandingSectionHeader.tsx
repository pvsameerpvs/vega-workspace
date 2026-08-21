import { LandingSectionHeading } from "./types";

export function LandingSectionHeader({
  heading,
  isAR,
  align = "center",
}: {
  heading: LandingSectionHeading;
  isAR: boolean;
  align?: "center" | "start";
}) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-start"}`}>
      <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-vega-yellow" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow">
          {heading.eyebrow}
        </span>
        {align === "center" && <span className="h-px w-8 bg-vega-yellow" />}
      </div>
      <h2 className="section-heading">{heading.title}</h2>
      {heading.subtitle && (
        <p
          className={`mt-4 text-base text-slate-500 leading-relaxed ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {heading.subtitle}
        </p>
      )}
    </div>
  );
}