import React from "react";
import { motion } from "motion/react";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
  /** Connects the tab to its tabpanel via aria-controls. */
  panelId: string;
}

const TabButton = ({
  active,
  selectTab,
  children,
  panelId,
}: TabButtonProps) => {
  const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${panelId}`}
      aria-selected={active}
      aria-controls={panelId}
      // Roving tabindex: only the selected tab is in the tab order, arrows move between them.
      tabIndex={active ? 0 : -1}
      onClick={selectTab}
    >
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
      ></motion.div>
    </button>
  );
};

export default TabButton;