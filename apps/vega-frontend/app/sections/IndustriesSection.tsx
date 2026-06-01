import { Building, Home, TreePine, Briefcase, Landmark, Hammer, Users2, Trash2, Snowflake, Factory } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

const ICONS = [
  <Building key={1} className="h-4 w-4" />,
  <Home key={2} className="h-4 w-4" />,
  <TreePine key={3} className="h-4 w-4" />,
  <Briefcase key={4} className="h-4 w-4" />,
  <Landmark key={5} className="h-4 w-4" />,
  <Hammer key={6} className="h-4 w-4" />,
  <Users2 key={7} className="h-4 w-4" />,
  <Trash2 key={8} className="h-4 w-4" />,
  <Factory key={9} className="h-4 w-4" />,
  <Snowflake key={10} className="h-4 w-4" />,
];

export function IndustriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Sectors</div>
          <h2 className="section-heading">Industries We Serve</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                {ICONS[i]}
              </div>
              <span className="text-sm text-gray-700">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
