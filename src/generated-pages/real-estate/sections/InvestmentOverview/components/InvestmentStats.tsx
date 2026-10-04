import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const StatItem = ({
  target,
  suffix,
  label,
  duration,
}: {
  target: number;
  suffix: string;
  label: string;
  duration?: number;
}) => {
  const { count, ref } = useCountUp(target, duration);
  return (
    <div
      ref={ref}
      className="items-center caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] no-underline md:items-start"
    >
      <p className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
        {count.toLocaleString()}
        <span className="text-[#ff6a00]">{suffix}</span>
      </p>
      <p className="caret-transparent text-gray-400 text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-inter md:text-left mt-1">
        {label}
      </p>
    </div>
  );
};

export const InvestmentStats = () => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full">
      <div className="items-center caret-transparent gap-x-6 flex flex-col outline-[3px] gap-y-6 no-underline md:items-start">
        <StatItem target={1240} suffix="+" label="Deals funded since inception" duration={2000} />
        <StatItem target={4} suffix="B+" label="Amount invested in real estate" duration={1800} />
        <StatItem target={8500} suffix="+" label="Actively earning users" duration={2200} />
      </div>
    </div>
  );
};
