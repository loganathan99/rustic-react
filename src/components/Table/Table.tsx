import React, { FunctionComponent } from "react";

interface ITableColumn<T> {
  label: string;
  key?: keyof T;
  render?: FunctionComponent<{ data: T; index: number }>;
}

interface ITableProps<T> {
  data: T[];
  columns: ITableColumn<T>[];
}

export function Table<T>(props: ITableProps<T>) {
  let { data, columns } = props;

  return (
    <div className="flex flex-col">
      <table className="text-sm text-gray-500">
        <thead>
          <tr className="border-b border-t border-gray-200">
            {columns.map((header, i) => (
              <th className="p-1 py-2 text-left" key={i}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="text-black border-b border-gray-200 hover:bg-slate-50"
            >
              {columns.map((col, j) => (
                <td className="p-1" key={j}>
                  {col.render ? (
                    <col.render data={row} index={i} />
                  ) : col.key ? (
                    <span>
                      <>{row[col.key]}</>
                    </span>
                  ) : (
                    <span>{col.label}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
