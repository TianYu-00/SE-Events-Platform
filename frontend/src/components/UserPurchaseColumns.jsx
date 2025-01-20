import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { TbArrowsSort } from "react-icons/tb";
import { dateFormatter } from "./DateFormatter";
import { moneyFormatter } from "./MoneyFormatter";

const columnHelper = createColumnHelper();
export const purchaseColumns = [
  columnHelper.accessor("purchase_event_name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Event Name</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_payment_status", {
    cell: (info) => (
      <div>
        {info.getValue() === "succeeded" ? (
          <span className="inline-flex items-center align-middle">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2" /> {info.getValue()}
          </span>
        ) : (
          <span>{info.getValue()}</span>
        )}
      </div>
    ),
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Status</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_descriptive_status", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Descriptive Status</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_paid_amount_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Paid</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_captured_amount_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Processed</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_refunded_amount_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Refunded</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_created_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Created At</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_modified_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="inline-flex items-center align-middle whitespace-nowrap space-x-1">
        <span>Modified At</span>
        <TbArrowsSort size={15} />
      </div>
    ),
  }),
];
