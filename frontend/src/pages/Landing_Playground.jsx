import React, { useState, useEffect } from "react";
import { getAllEvents, deleteEvents } from "../api";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { TbSearch, TbCaretLeft, TbCaretLeftFilled, TbCaretRight, TbCaretRightFilled, TbTrash } from "react-icons/tb";
import { eventColumns } from "../components/EventColumns";
import Modal from "../components/Modal";
import Landing_EditEvent from "./Landing_EditEvent";

function Landing_Playground() {
  const [events, setEvents] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const runFetchEvents = async () => {
      const response = await getAllEvents({});
      // console.log("Events response:", response.data);
      setEvents(response.data);
    };

    runFetchEvents();
  }, []);

  const table = useReactTable({
    data: events,
    columns: eventColumns,
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

    enableRowSelection: true,
  });

  useEffect(() => {
    // console.log("Table Row Model:", table.getRowModel());
  }, [events, table]);

  const handle_LogSelectedRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(selectedRows.map((row) => row.original));
  };

  const handle_DeleteEvents = async () => {
    try {
      const listOfEventIds = table.getSelectedRowModel().rows.map((row) => row.original.event_id);
      if (listOfEventIds <= 0) {
        console.error("Delete rejected, no row selected");
        return;
      }
      const response = await deleteEvents({ listOfEventIds: listOfEventIds });
      // console.log(response);
      if (response.success) {
        setEvents((prevEvents) => prevEvents.filter((event) => !listOfEventIds.includes(event.event_id)));
        table.resetRowSelection();
        // console.log(`${response.data.deletedRows.length} event's deleted`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="px-4">
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

      <div className="flex space-x-4 px-4 pb-4">
        <button
          onClick={handle_LogSelectedRows}
          className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active"
        >
          Log Selected Rows
        </button>

        <button
          onClick={handle_DeleteEvents}
          className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active flex justify-center items-center space-x-2"
        >
          <TbTrash size={17} />
          <span>Delete</span>
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active flex justify-center items-center space-x-2"
        >
          <TbTrash size={17} />
          <span>Test Modal</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        modalTitle={`Test Modal`}
      >
        <Landing_EditEvent eventData={table.getSelectedRowModel().rows[0]?.original} />
      </Modal>

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

          {/* For Debug */}
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
