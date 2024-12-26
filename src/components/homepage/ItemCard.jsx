import React from 'react';

export default function ItemCard({ imageUrl, name }) {
  return (
    // min-w adalah koentji
    <div className="flex flex-col gap-1 p-2 min-w-36 max-w-36 lg:min-w-56 lg:max-w-56">
      <img
        src={imageUrl}
        alt={imageUrl}
        className="hover:shadow-md object-cover overflow-hidden outline h-24 lg:h-32 rounded-md"
      />
      <p>{name}</p>
    </div>
  );
}
