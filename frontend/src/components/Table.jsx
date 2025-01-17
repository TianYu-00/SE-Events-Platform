import React from "react";
import { flexRender } from "@tanstack/react-table";

const Table = ({ table }) => {
  return (
    <div className="px-4">
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto bg-card">
          <table className="min-w-full table-fixed border-collapse ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="text-copy-primary h-16">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`${header.column.columnDef.meta?.className} p-4 text-sm md:text-base`}
                    >
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
                        className={`${cell.column.columnDef.meta?.className} cursor-pointer p-4 text-sm md:text-base`}
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
      </div>
    </div>
  );
};

export default Table;
