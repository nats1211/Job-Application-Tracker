function ChevronDown() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SelectWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
        <ChevronDown />
      </span>
    </div>
  );
}

export const inputCls =
  "w-full px-3 py-2.5 text-sm rounded-[10px] border border-[#E4E4E0] bg-white text-[#18181B] placeholder-zinc-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-zinc-300";

export const selectCls =
  "px-3 py-2.5 text-sm rounded-[10px] border border-[#E4E4E0] bg-white text-[#18181B] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 hover:border-zinc-300 cursor-pointer appearance-none pr-8";
