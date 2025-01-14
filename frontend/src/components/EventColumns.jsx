import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { TbArrowsSort } from "react-icons/tb";
import { dateFormatter } from "./DateFormatter";
import { moneyFormatter } from "./MoneyFormatter";

const columnHelper = createColumnHelper();
export const eventColumns = [
  columnHelper.display({
    // https://tanstack.com/table/v8/docs/guide/row-selection
    id: "selection",
    cell: ({ row }) => (
      <div className="flex space-x-2 justify-center items-center">
        <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
      </div>
    ),
    header: ({ table }) => (
      <div className="flex space-x-2 justify-center items-center">
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
  }),

  columnHelper.accessor("event_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Event ID</span> <TbArrowsSort size={15} />
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
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Attendees</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_capacity", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Capacity</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell",
    },
  }),

  columnHelper.accessor("event_organizer_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Organizer ID</span> <TbArrowsSort size={15} />
      </div>
    ),
    meta: {
      className: "px-4 py-2 text-left hidden md:table-cell truncate",
    },
  }),
];
