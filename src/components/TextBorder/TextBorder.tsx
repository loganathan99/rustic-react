import React, { FunctionComponent } from "react";

export const TextBorder: FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center text-gray-500 mb-5">
      <div className="mr-3">{text}</div>
      <div className="flex-1">
        <hr />
      </div>
    </div>
  );
};
