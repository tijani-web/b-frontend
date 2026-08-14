export type FooterColumnProps = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

export const FooterColumn = (props: FooterColumnProps) => {
  return (
    <div className="caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <p className="caret-transparent text-zinc-50 text-[13px] font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
        {props.title}
      </p>
      <ul className="caret-transparent gap-x-4 flex flex-col list-none min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline mt-3 pl-0">
        {props.links.map((link) => (
          <li
            key={`${link.href}-${link.label}`}
            className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter"
          >
            <a
              href={link.href}
              className="caret-transparent text-slate-300 outline-[3px] no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
