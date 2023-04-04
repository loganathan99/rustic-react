import React, { forwardRef, FunctionComponent, ReactNode } from "react";

interface IListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  text: string;
  subtext?: string;
  icon?: ReactNode;
  active?: boolean;
  menuItem?: boolean;
}

export const ListItem: FunctionComponent<IListItemProps> = forwardRef<
  HTMLLIElement,
  IListItemProps
>(function ListItem(props, ref) {
  const { text, subtext, icon, active, menuItem, ...rest } = props;
  return (
    <li
      ref={ref}
      className={`py-1.5 px-3 my-0.5 rounded flex text-gray-800 hover:bg-gray-50 hover:text-purple-500 items-center cursor-pointer ${
        active ? "text-purple-500 bg-gray-50" : ""
      } ${menuItem ? "cursor-pointer text-sm font-medium" : ""}`}
      {...rest}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <div className="flex flex-col items-start">
        <span>{text}</span>
        {subtext && <span className="text-xs">{subtext}</span>}
      </div>
    </li>
  );
});
