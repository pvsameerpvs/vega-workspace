"use client";

import { track } from "@/lib/tracking";

interface TrackedAnchorProps {
  href: string;
  event: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function TrackedAnchor({
  href,
  event,
  label,
  className,
  children,
  target,
  rel,
  onClick,
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        track(event, { label });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}