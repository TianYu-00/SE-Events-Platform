import React, { useState, useEffect } from "react";
import { getAllPurchases } from "../api";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { purchaseColumns } from "../components/UserPurchaseColumns";
import Table from "../components/Table";
import Pagination from "../components/TablePagination";
import Search from "../components/TableSearch";
import { useUser } from "@clerk/clerk-react";

function Landing_ManageEvents() {
  const { user } = useUser();
  const [purchases, setPurchases] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const runFetchAllPurchasesByUser = async () => {
    const response = await getAllPurchases({ orderCreatedAt: "desc", userId: user.id });
    setPurchases(response.data);
    // console.log(response);
  };

  useEffect(() => {
    if (user) {
      runFetchAllPurchasesByUser();
    }
  }, [user]);

  const table = useReactTable({
    data: purchases,
    columns: purchaseColumns,
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

  return (
    <div>
      <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="flex space-x-4 px-4 pb-4"></div>

      <Table table={table} />
      <Pagination table={table} />
    </div>
  );
}

export default Landing_ManageEvents;
