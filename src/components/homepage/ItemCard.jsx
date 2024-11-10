import React from 'react';

export default function ItemCard({ imageUrl, name }) {
  return (
    // min-w adalah koentji
    <div className="flex flex-col gap-1 p-2 min-w-64">
      <img
        src={imageUrl}
        alt={imageUrl}
        className="hover:shadow-md object-cover overflow-hidden outline outline-2 outline-textP h-40 rounded-md"
      />
      <p>{name}</p>
    </div>
  );
}
