import React, { useState, useEffect } from "react";
import { getAllEvents } from "../api";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { dateFormatter } from "../components/DateFormatter";
import { moneyFormatter } from "../components/MoneyFormatter";
import {
  TbSearch,
  TbArrowsSort,
  TbCaretLeft,
  TbCaretLeftFilled,
  TbCaretRight,
  TbCaretRightFilled,
} from "react-icons/tb";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("event_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>ID</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left",
    },
  }),

  columnHelper.accessor("event_name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Name</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left",
    },
  }),

  columnHelper.accessor("event_start_date", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Start Date</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_end_date", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>End Date</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_created_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Created At</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_modified_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Modified At</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_cost_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Cost</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_attendees", {
    cell: (info) => (
      <span>
        {info.getValue()}/{info.row.original.event_capacity}
      </span>
    ),
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Attendees</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),
];

function Landing_Playground() {
  const [events, setEvents] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents({});
      //   console.log("Events response:", response.data);
      setEvents(response.data);
    };

    runFetchEvents();
  }, []);

  const table = useReactTable({
    data: events,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    // console.log("Table Row Model:", table.getRowModel());
  }, [events, table]);

  return (
    <div>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="px-4">
        <table className="w-full table-fixed border-collapse bg-card rounded-md">
          {/* Table Header */}
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

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t text-copy-primary/65 hover:bg-background-opp/10 h-14">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={cell.column.columnDef.meta?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2 text-copy-primary/70">Events per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <TbCaretLeftFilled size={17} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <TbCaretLeft size={17} />
          </button>

          <span className="flex items-center">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1 text-copy-primary/70">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <TbCaretRight size={17} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <TbCaretRightFilled size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing_Playground;

// https://tanstack.com/table/v8/docs/guide/data
