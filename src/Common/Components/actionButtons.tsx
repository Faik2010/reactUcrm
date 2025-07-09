import React from "react";
import { Menu } from "@headlessui/react";
import { MoreHorizontal } from "lucide-react";

interface Action {
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  textColor?: string;
  to?: string;
  title?: string;
}

interface ActionButtonsProps {
  actions: Action[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
  const renderContent = (action: Action) => {
    if (action.icon && action.text) {
      return (
        <div className="flex items-center gap-2">
          <span className="flex items-center flex-shrink-0">{action.icon}</span>
          <span className="flex items-center">{action.text}</span>
        </div>
      );
    }
    if (action.icon) {
      return <span className="flex items-center">{action.icon}</span>;
    }
    return <span className="flex items-center">{action.text}</span>;
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="text-white btn bg-orange-400 border-orange-500 hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-600 focus:border-orange-600 focus:ring focus:ring-orange-100 active:text-white active:bg-orange-600 active:border-orange-600 active:ring active:ring-orange-100 dark:ring-orange-400/20">
        <MoreHorizontal className="size-4" />
      </Menu.Button>

      <Menu.Items 
        className="absolute right-0 z-50 w-40 py-2 mt-1 origin-top-right bg-white rounded-md shadow-md dark:bg-zink-600 focus:outline-none"
      >
        {actions.map((action, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              action.to ? (
                <a
                  href={action.to}
                  className={`${
                    active ? 'bg-slate-100 text-slate-500' : 'text-slate-600'
                  } px-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 block data-[focus]:bg-slate-100`}
                  title={action.title}
                >
                  {renderContent(action)}
                </a>
              ) : (
                <button
                  onClick={action.onClick}
                  className={`${
                    active ? 'bg-slate-100 text-slate-500' : 'text-slate-600'
                  } w-full px-4 py-1.5 text-left text-base font-medium transition-all duration-200 ease-linear dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 block data-[focus]:bg-slate-100`}
                  style={{ color: action.textColor }}
                  title={action.title}
                >
                  {renderContent(action)}
                </button>
              )
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default ActionButtons;
