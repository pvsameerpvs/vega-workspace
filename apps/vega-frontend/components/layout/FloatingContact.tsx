import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const items = [
  {
    href: "https://wa.me/971567351095",
    target: "_blank",
    rel: "noreferrer",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    href: "tel:+971567351095",
    icon: Phone,
    label: "Call",
    color: "bg-[#1F3A93] hover:bg-[#152a6b]",
  },
  {
    href: "mailto:Sales@thevegauae.com",
    icon: Mail,
    label: "Email",
    color: "bg-red-500 hover:bg-red-600",
  },
];

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.rel}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-full ${item.color} text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
          >
            <item.icon className="h-5 w-5" />
            <span className="absolute left-14 whitespace-nowrap rounded-md bg-gray-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
