import Link from "next/link";
import { tabs } from "@/global/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
interface DropDownProps {
  isStudent: boolean;
  tab: Record<string, any>;
  dir?: string;
  setActive: Dispatch<SetStateAction<boolean>>;
}
const DropDown = ({ isStudent, tab, dir, setActive }: DropDownProps) => {
  const handleTabsName = (
    isStudent: boolean,
    tab: Record<string, any>,
    dir: string
  ) => {
    const baseName = tab.name.replace(/\s+/g, "").toLowerCase();
    if (isStudent) return baseName;

    if (tab.name === "Log out") return baseName;

    return dir ? `${dir}/${baseName}` : `/${baseName}`;
  };
  return (
    <div className="transition-all duration-300 opacity-100 scale-100 shadow-custom z-20 dark:shadow-none w-[250px] flex justify-between flex-col absolute text-black dark:text-white md:-left-[45px] -left-[120%] top-[70px] border dark:border-borderDark pb-5 bg-white dark:bg-lightDark rounded-md">
      {tabs.map((tab) => (
        <Link
          onClick={() => {
            setActive(false);
          }}
          key={tab.key}
          href={handleTabsName(isStudent, tab, dir ?? "")}
        >
          <div className="flex flex-col">
            <div
              className={`flex items-center gap-3 text-lg py-3 px-5 cursor-pointer hover:bg-gray-300/20 dark:hover:bg-gray-200/20`}
            >
              <FontAwesomeIcon
                className="text-gray-400/80 dark:text-white"
                icon={tab.icon}
              />
              <div>{tab.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DropDown;
