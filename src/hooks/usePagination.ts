"use client";

import { useState } from "react";

export const ROW_OPTIONS = [10, 25, 50];

export type Pagination<T> = {
  page: number;
  pageCount: number;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  pageRows: T[];
  rangeStart: number;
  rangeEnd: number;
  goPrev: () => void;
  goNext: () => void;
  reset: () => void;
};

/**
 * Slices `items` into pages. `total` drives the footer counts and page count,
 * letting a filtered view report its own size while an unfiltered view can
 * report a larger server total.
 */
export function usePagination<T>(items: T[], total: number): Pagination<T> {
  const [rowsPerPage, setRowsPerPageState] = useState(ROW_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, pageCount);
  const pageRows = items.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(currentPage * rowsPerPage, total);

  const setRowsPerPage = (rows: number): void => {
    setRowsPerPageState(rows);
    setPage(1);
  };

  return {
    page: currentPage,
    pageCount,
    rowsPerPage,
    setRowsPerPage,
    pageRows,
    rangeStart,
    rangeEnd,
    goPrev: () => setPage((prev) => Math.max(1, prev - 1)),
    goNext: () => setPage((prev) => Math.min(pageCount, prev + 1)),
    reset: () => setPage(1),
  };
}
