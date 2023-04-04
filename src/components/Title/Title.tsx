import React, { FunctionComponent } from "react";

interface IDisplayTitleProps {
  title: string;
  subtitle?: string;
}

export const DisplayTitle: FunctionComponent<IDisplayTitleProps> = (props) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">{props.title}</h1>
      <h2 className="text-xs text-gray-500">{props.subtitle}</h2>
    </div>
  );
};
