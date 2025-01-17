import React, { useState, useEffect } from "react";
import { getAllEvents, deleteEvents } from "../api";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { TbTrash, TbEdit } from "react-icons/tb";
import { eventColumns } from "../components/EventColumns";
import Modal from "../components/Modal";
import Landing_EditEvent from "./Landing_EditEvent";
import Table from "../components/Table";
import Pagination from "../components/TablePagination";
import Search from "../components/TableSearch";

function Landing_ManageEvents() {
  const [events, setEvents] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const runFetchEvents = async () => {
    const response = await getAllEvents({});
    setEvents(response.data);
  };

  useEffect(() => {
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

  const handle_LogSelectedRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(selectedRows.map((row) => row.original));
  };

  const handle_DeleteEvents = async () => {
    try {
      const listOfEventIds = table.getSelectedRowModel().rows.map((row) => row.original.event_id);
      if (listOfEventIds.length <= 0) {
        console.error("Delete rejected, no row selected");
        return;
      }
      const response = await deleteEvents({ listOfEventIds: listOfEventIds });
      if (response.success) {
        setEvents((prevEvents) => prevEvents.filter((event) => !listOfEventIds.includes(event.event_id)));
        table.resetRowSelection();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="flex space-x-4 px-4 pb-4">
        <button
          onClick={handle_LogSelectedRows}
          className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active"
        >
          Log Selected
        </button>

        {table.getSelectedRowModel().rows.length > 0 && (
          <button
            onClick={handle_DeleteEvents}
            className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active flex justify-center items-center space-x-2"
          >
            <TbTrash size={17} />
            <span>Delete</span>
          </button>
        )}

        {table.getSelectedRowModel().rows.length === 1 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-cta text-cta-text rounded hover:bg-cta-active flex justify-center items-center space-x-2"
          >
            <TbEdit size={17} />
            <span>Edit</span>
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          runFetchEvents();
          table.resetRowSelection();
        }}
        modalTitle={`Test Modal`}
      >
        <Landing_EditEvent eventData={table.getSelectedRowModel().rows[0]?.original} />
      </Modal>

      <Table table={table} />
      <Pagination table={table} />
    </div>
  );
}

export default Landing_ManageEvents;
