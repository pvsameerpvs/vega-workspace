"use client";

import { motion } from "framer-motion";
import { ProtectedImage } from "@/components/ProtectedImage";
import { Mail, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  nameAr?: string;
  designation: string;
  designationAr?: string;
  bio?: string;
  bioAr?: string;
  photo?: string;
  email?: string;
  linkedIn?: string;
}

interface AboutTeamProps {
  isAR: boolean;
  team: TeamMember[];
}

export function AboutTeam({ isAR, team }: AboutTeamProps) {
  if (!team.length) return null;

  return (
    <section className="py-24 bg-white" dir={isAR ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 rounded-full bg-[#FFD400]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD400]">
            {isAR ? "فريقنا" : "Our People"}
          </span>
          <h2 className="section-heading">
            {isAR ? "تعرف على فريقنا" : "Meet the Team"}
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {isAR
              ? "المحترفون المكرسون وراء نجاح فيجا."
              : "The dedicated professionals behind Vega's success."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="modern-card p-8 text-center group"
            >
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-4 border-[#FFD400]/20 bg-slate-100">
                <ProtectedImage
                  src={member.photo || ""}
                  alt={isAR && member.nameAr ? member.nameAr : member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold text-[#1F3A93]">
                {isAR && member.nameAr ? member.nameAr : member.name}
              </h3>
              <p className="text-sm font-semibold text-[#FFD400] mt-1">
                {isAR && member.designationAr
                  ? member.designationAr
                  : member.designation}
              </p>
              {(member.bio || member.bioAr) && (
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {isAR && member.bioAr ? member.bioAr : member.bio}
                </p>
              )}
              <div className="mt-4 flex items-center justify-center gap-3">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-50 text-slate-400 hover:bg-[#1F3A93] hover:text-white transition-all"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-50 text-slate-400 hover:bg-[#1F3A93] hover:text-white transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
