import React from "react";
import { TbSearch } from "react-icons/tb";

const Search = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className="px-4">
      <div className="relative">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-card text-copy-primary"
        />
        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default Search;
