"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface AboutStatsProps {
  isAR: boolean;
  stats: Stat[];
}

function parseCount(value: string) {
  const num = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "").replace(/,/g, "");
  return { num, suffix };
}

export function AboutStats({ isAR, stats }: AboutStatsProps) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <section className="relative bg-[#1F3A93] py-20 overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#FFD400]/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const { num, suffix } = parseCount(stat.value);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#FFD400] tabular-nums mb-2">
                  {start ? (
                    <CountUp
                      end={num}
                      suffix={suffix}
                      duration={2.5}
                      separator=","
                    />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-sm text-white/70 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
