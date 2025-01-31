import React, { useState } from "react";
import { TbX } from "react-icons/tb";

function CustomInputTag({ tags = [], setTags }) {
  const [input, setInput] = useState("");
  const [draggedEventTagIndex, setDraggedEventTagIndex] = useState(null);

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

  const handle_DragStart = (index) => {
    setDraggedEventTagIndex(index);
  };

  const handle_TagDrop = (dropIndex) => {
    if (draggedEventTagIndex === dropIndex) return;

    const updatedTags = [...tags];
    const [draggedTag] = updatedTags.splice(draggedEventTagIndex, 1);
    updatedTags.splice(dropIndex, 0, draggedTag);

    setTags(updatedTags);
    setDraggedEventTagIndex(null);
  };

  const handle_TagDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`p-2 bg-card text-copy-primary border border-border rounded-md flex space-x-2 hover:cursor-pointer ${
                draggedEventTagIndex === index ? "bg-blue-500/30" : ""
              }`}
              draggable
              onDragStart={() => handle_DragStart(index)}
              onDrop={() => handle_TagDrop(index)}
              onDragOver={handle_TagDragOver}
            >
              <span>{tag}</span>
              <button className="text-red-500 px-1 hover:text-red-400" onClick={() => handle_RemoveTag(tag)}>
                <TbX size={17} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        id="event_tag_input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handle_KeyDownSubmitTag}
        placeholder="Press enter or comma to add tag"
        className="block w-full rounded-md shadow-sm p-2 border border-border bg-card text-copy-primary focus:outline-none focus:border-border col-span-2"
        maxLength="28"
        aria-label="enter new tag to be added"
      />
    </div>
  );
}

export default CustomInputTag;
