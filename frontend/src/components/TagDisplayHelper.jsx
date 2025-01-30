import React from "react";
import { useNavigate } from "react-router-dom";

function TagDisplayHelper({ tags }) {
  const navigate = useNavigate();

  const handle_TagClick = (tag) => {
    navigate(`/events?search=${tag}`);
  };

  return tags.map((tag, index) => {
    return (
      <span
        key={index}
        onClick={() => handle_TagClick(tag)}
        className="p-1 px-2 bg-background rounded-md hover:cursor-pointer"
      >
        {tag}
      </span>
    );
  });
}

export default TagDisplayHelper;
