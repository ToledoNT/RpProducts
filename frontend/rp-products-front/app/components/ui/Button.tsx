import React from "react";

export default function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
