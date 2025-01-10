import React, { useState } from "react";
import { TbX } from "react-icons/tb";

function CustomInputTag({ tags = [], setTags }) {
  const [input, setInput] = useState("");

  const handle_KeyDownSubmitTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim() && !tags.includes(input.trim())) {
        const newTags = [...tags, input.trim()];
        setTags(newTags);
      }
      setInput("");
    }
  };

  const handle_RemoveTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex space-x-4 mb-2">
          {tags.map((tag, index) => (
            <div key={index} className="p-2 bg-card text-copy-primary border border-border rounded-md flex space-x-2">
              <span>{tag}</span>
              <button className="text-red-500 px-1" onClick={() => handle_RemoveTag(tag)}>
                <TbX size={17} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handle_KeyDownSubmitTag}
        placeholder="Press enter or comma to add tag"
        className="block w-full border-gray-300 rounded-md shadow-sm p-2 border focus:outline-none focus:border-border"
      />
    </div>
  );
}

export default CustomInputTag;
