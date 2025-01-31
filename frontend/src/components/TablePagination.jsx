import React from "react";
import { TbCaretLeftFilled, TbCaretRightFilled, TbChevronRight, TbChevronLeft } from "react-icons/tb";

const Pagination = ({ table }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm p-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <span className="mr-2 text-copy-primary/70">Events per page</span>
        <select
          className="border border-gray-300 rounded-md shadow-sm p-2 bg-card text-copy-primary"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          aria-label="select events per page"
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
          className="p-2 rounded-md text-copy-primary hover:bg-cta-active hover:text-cta-text disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent disabled:hover:text-copy-primary"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="navigate to first page"
        >
          <TbCaretLeftFilled size={17} />
        </button>
        <button
          className="p-2 rounded-md text-copy-primary hover:bg-cta-active hover:text-cta-text disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent disabled:hover:text-copy-primary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="previous page"
        >
          <TbChevronLeft size={17} strokeWidth={3} />
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
            className="w-16 p-2 rounded-md border border-border text-center bg-card text-copy-primary"
            aria-label="enter page number to navigate to"
          />
          <span className="ml-1 text-copy-primary/70">of {table.getPageCount()}</span>
        </span>
        <button
          className="p-2 rounded-md text-copy-primary hover:bg-cta-active hover:text-cta-text disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent disabled:hover:text-copy-primary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="next page"
        >
          <TbChevronRight size={17} strokeWidth={3} />
        </button>
        <button
          className="p-2 rounded-md text-copy-primary hover:bg-cta-active hover:text-cta-text disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:hover:bg-transparent disabled:hover:text-copy-primary"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="navigate to last page"
        >
          <TbCaretRightFilled size={17} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
