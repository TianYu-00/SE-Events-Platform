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
      <div className="flex space-x-2 justify-center items-center">
        <span>Event Name</span> <TbArrowsSort size={15} />
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
      <div className="flex space-x-2 justify-center items-center">
        <span>Status</span> <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_paid_amount_in_pence", {
    cell: (info) => <span>£{moneyFormatter(info.getValue())}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Paid</span> <TbArrowsSort size={15} />
      </div>
    ),
  }),

  columnHelper.accessor("purchase_created_at", {
    cell: (info) => <span>{dateFormatter(info.getValue(), 3)}</span>,
    header: () => (
      <div className="flex space-x-2 justify-center items-center">
        <span>Created At</span> <TbArrowsSort size={15} />
      </div>
    ),
  }),
];
