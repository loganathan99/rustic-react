import React, { FunctionComponent } from "react";

export const ActionGroup: FunctionComponent<{
  children: any;
  align?: "left" | "right" | "center";
}> = (props) => {
  const { align = "center" } = props;
  return (
    <div
      className={`flex ${
        align == "center"
          ? "items-center"
          : align == "right"
          ? "items-end"
          : "items-start"
      } gap-2`}
    >
      {props.children}
    </div>
  );
};

export const BadgeGroup: FunctionComponent<{ children: any }> = (props) => {
  return (
    <div className="flex items-center badge-group flex-wrap">
      {props.children}
    </div>
  );
};
