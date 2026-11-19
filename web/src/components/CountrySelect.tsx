"use client";

import { useEffect, useId, useRef, useState } from "react";
import { COUNTRIES, countryFlagSrc, findCountry } from "@/lib/countries";

type Props = {
  value: string;
  onChange: (code: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
};

export function CountrySelect({ value, onChange, placeholder, label, required }: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = findCountry(value);

  const filtered = COUNTRIES.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dial.includes(q);
  });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <label className="country-select">
      <span>{label}</span>
      <div className="country-select__wrap" ref={rootRef}>
        <button
          type="button"
          className="country-select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
        >
          {selected ? (
            <>
              <img src={countryFlagSrc(selected.code)} alt="" width={22} height={16} />
              <strong>{selected.name}</strong>
            </>
          ) : (
            <strong className="country-select__placeholder">{placeholder}</strong>
          )}
          <em aria-hidden>▾</em>
        </button>

        {/* Keeps native required validation without showing a second control */}
        <select
          className="country-select__native"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          aria-hidden
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        {open && (
          <div className="country-select__panel" id={listId} role="listbox">
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              aria-label="Search country"
            />
            <ul>
              {filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.code === value}
                    className={c.code === value ? "is-active" : undefined}
                    onClick={() => {
                      onChange(c.code);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    <img src={countryFlagSrc(c.code)} alt="" width={22} height={16} />
                    <span>{c.name}</span>
                    <em>{c.dial}</em>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="country-select__empty">No matches</li>}
            </ul>
          </div>
        )}
      </div>
    </label>
  );
}
