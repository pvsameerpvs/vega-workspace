import { Building, Home, TreePine, Briefcase, Landmark, Hammer, Users2, Trash2, Snowflake, Factory } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

const ICONS = [
  <Building key={1} className="h-5 w-5" />,
  <Home key={2} className="h-5 w-5" />,
  <TreePine key={3} className="h-5 w-5" />,
  <Briefcase key={4} className="h-5 w-5" />,
  <Landmark key={5} className="h-5 w-5" />,
  <Hammer key={6} className="h-5 w-5" />,
  <Users2 key={7} className="h-5 w-5" />,
  <Trash2 key={8} className="h-5 w-5" />,
  <Factory key={9} className="h-5 w-5" />,
  <Snowflake key={10} className="h-5 w-5" />,
];

export function IndustriesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Sectors</div>
          <h2 className="section-heading">Industries We Serve</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                {ICONS[i]}
              </div>
              <span className="text-base text-gray-700">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
