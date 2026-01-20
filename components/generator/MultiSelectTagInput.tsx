"use client";

import { useState, KeyboardEvent } from "react";

type Option = {
  id: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
};


export default function MultiSelectTagInput ({
  options,
  value,
  onChange,
}: Props) {
  const [input, setInput] = useState('');

  const add = (val: string) => {
    const v = val.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setInput('');
  };

  const remove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
    }
  };

  return (
    <div className="space-y-3">
      {/* Selected tags */}
      <div className="flex flex-wrap gap-2 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
        {value.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded bg-indigo-100 px-2 py-1 text-sm text-indigo-700"
          >
            {v}
            <button className="cursor-pointer" onClick={() => remove(v)}>✕</button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type and press enter..."
          className="flex-1 min-w-30 outline-none text-sm"
        />
      </div>

      {/* Preset options */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => add(opt.id)}
            className={`rounded border px-2 py-1 text-xs cursor-pointer
              ${
                value.includes(opt.id)
                  ? 'bg-indigo-500 text-white'
                  : 'hover:bg-gray-100 text-indigo-500'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};