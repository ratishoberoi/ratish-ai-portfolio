import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-signal/80">
          {kicker}
        </p>
        <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.9] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      {children ? <div className="max-w-sm text-sm leading-6 text-slate-400">{children}</div> : null}
    </div>
  );
}
