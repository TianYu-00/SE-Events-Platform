import React from "react";
import { flexRender } from "@tanstack/react-table";

const Table = ({ table }) => {
  return (
    <div className="px-4">
      <table className="w-full table-fixed border-collapse bg-card rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-copy-primary h-20">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={header.column.columnDef.meta?.className}>
                  <div
                    {...{
                      className: header.column.getCanSort() ? "cursor-pointer select-none flex items-center" : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t text-copy-primary/65 hover:bg-background-opp/10 h-14">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`${cell.column.columnDef.meta?.className} cursor-pointer`}
                    onClick={row.getToggleSelectedHandler()}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
