import React, { FunctionComponent } from "react";

interface IStatisticCardProp {
  data: number;
  denominator?: number;
  unit?: string;
  title: string;
}

export const StatisticCard: FunctionComponent<{ data: IStatisticCardProp }> = ({
  data,
}) => {
  return (
    <div className="rounded border border-gray-200 flex-grow p-4">
      <div className="text-xs text-gray-500 uppercase font-bold">
        {data.title}
      </div>
      <div className="mt-2">
        <span className="font-bold text-2xl">{data.data}</span>
        {data.denominator && (
          <span className="text-lg text-gray-500 font-bold">
            {" "}
            / {data.denominator}
          </span>
        )}
        {data.unit && (
          <span className="text-xs text-gray-500 font-bold uppercase">
            {" "}
            {data.unit}
          </span>
        )}
      </div>
    </div>
  );
};
