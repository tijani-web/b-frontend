import { NavigationItem } from "./NavigationItem";

export const DesktopNavigation = () => {
  return (
    <div className="caret-transparent hidden max-w-[468px] min-h-0 min-w-0 outline-[3px] no-underline w-full mx-auto md:block md:min-h-[auto] md:min-w-[auto]">
      <nav className="box-border caret-transparent outline-[3px] no-underline w-6/12 mx-auto p-1 rounded-lg">
        <ul className="items-center caret-transparent gap-x-2 flex list-none outline-[3px] relative gap-y-2 no-underline pl-0">
          <NavigationItem label="Explore" />
          <NavigationItem label="Company" />
          <NavigationItem label="Trade" />
        </ul>
      </nav>
    </div>
  );
};
