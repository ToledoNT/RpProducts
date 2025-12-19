// ../ui/Input.tsx
"use client";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        {...props}
        className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}