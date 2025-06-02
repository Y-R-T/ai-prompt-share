// frontend/src/components/SidebarTags.js
import React from 'react';

function SidebarTags({ tags, title }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title || "标签"}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SidebarTags;