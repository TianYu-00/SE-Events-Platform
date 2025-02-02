import React from "react";
import { TbChevronUp } from "react-icons/tb";

function BackToTop() {
  return (
    <div className="text-copy-primary fixed bottom-5 right-5">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-full hover:bg-blue-600 p-2 hover:text-white"
        aria-label="scroll to top"
        role="button"
      >
        <TbChevronUp size={17} strokeWidth={3} />
      </button>
    </div>
  );
}

export default BackToTop;
