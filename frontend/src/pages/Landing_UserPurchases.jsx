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
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import useErrorChecker from "../hooks/useErrorChecker";
import PageLoader from "../components/PageLoader";

function Landing_ManageEvents() {
  const checkError = useErrorChecker();
  const { getToken } = useAuth();

  const { user } = useUser();
  const [purchases, setPurchases] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const runFetchAllPurchasesByUser = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const response = await getAllPurchases({ orderCreatedAt: "desc", userId: user.id, token: token });
      setPurchases(response.data);
    } catch (error) {
      checkError(error);
    } finally {
      setIsLoading(false);
    }
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
    <PageLoader isLoading={isLoading} message="fetching purchases">
      <div>
        <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

        <div className="flex space-x-4 px-4 pb-4"></div>

        <Table table={table} />
        <Pagination table={table} />
      </div>
    </PageLoader>
  );
}

export default Landing_ManageEvents;
