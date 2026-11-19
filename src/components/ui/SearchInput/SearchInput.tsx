"use client";

import Image from "next/image";
import { useId, type FormEvent } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Enter 입력 시 즉시 검색 */
  onSubmit?: (value: string) => void;
  /** X 버튼 클릭 */
  onClear?: () => void;
  placeholder?: string;
  label?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "검색",
  label = "검색어",
}: SearchInputProps) {
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <form role="search" className={styles.box} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <Image src="/icons/search.svg" alt="" width={20} height={20} className={styles.icon} />
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <input
          id={inputId}
          type="search"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <button
        type="button"
        className={styles.clear}
        onClick={handleClear}
        aria-label="검색어 지우기"
        disabled={!value}
      >
        <Image src="/icons/x.svg" alt="" width={16} height={16} />
      </button>
    </form>
  );
}
