import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { TbArrowsSort } from "react-icons/tb";
import { dateFormatter } from "../utils/DateFormatter";
import { moneyFormatter } from "../utils/MoneyFormatter";

const columnHelper = createColumnHelper();
export const eventColumns = [
  columnHelper.display({
    // https://tanstack.com/table/v8/docs/guide/row-selection
    id: "selection",
    cell: ({ row }) => (
      <div className="flex space-x-2 justify-center items-center">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={`Select event ${row.original.event_name}`}
        />
      </div>
    ),
    header: ({ table }) => (
      <div className="flex space-x-2 justify-center items-center">
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          aria-label="Select all events in the table"
        />
        <span className="sr-only">select event table header</span>
      </div>
    ),
  }),

  columnHelper.accessor("event_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Event ID</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Name</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_start_date", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Start Date</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_end_date", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>End Date</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_created_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Created At</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_modified_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Modified At</span> <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_cost_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Cost</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_attendees", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Attendees</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_capacity", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Capacity</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),

  columnHelper.accessor("event_organizer_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <button className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Organizer ID</span>
        <TbArrowsSort size={15} />
      </button>
    ),
    meta: {},
  }),
];
