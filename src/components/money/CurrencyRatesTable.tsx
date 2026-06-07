"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import type { CurrencyRate } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { SearchInput } from "@/components/reusables/SearchInput";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { TablePagination } from "@/components/customers/TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

function CountryCell({
  country,
  currency,
}: Readonly<{ country: string; currency: string }>): React.ReactElement {
  return (
    <div>
      <p className="text-sm font-medium">{country}</p>
      <p className="text-xs text-muted-foreground">{currency}</p>
    </div>
  );
}

type CurrencyRatesTableProps = {
  rates: CurrencyRate[];
  total: number;
};

export function CurrencyRatesTable({
  rates,
  total,
}: Readonly<CurrencyRatesTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rates.filter(
      (rate) =>
        rate.fromCountry.toLowerCase().includes(query) ||
        rate.toCountry.toLowerCase().includes(query) ||
        rate.fromCurrency.toLowerCase().includes(query) ||
        rate.toCurrency.toLowerCase().includes(query),
    );
  }, [rates, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Country rates"
        subtitle="Edit per-currency buy / sell rates. Base currency is selectable."
      >
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
        <Button className="gap-1.5">
          <Plus className="size-4" />
          Add Currency pair
        </Button>
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>From</TableHead>
              <TableHead className={HEAD_CLASS}>To</TableHead>
              <TableHead className={HEAD_CLASS}>Rate</TableHead>
              <TableHead className={HEAD_CLASS}>Buy Rate</TableHead>
              <TableHead className={HEAD_CLASS}>Sell Rate</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No currency pairs found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="px-4 py-3">
                    <CountryCell
                      country={rate.fromCountry}
                      currency={rate.fromCurrency}
                    />
                  </TableCell>
                  <TableCell>
                    <CountryCell
                      country={rate.toCountry}
                      currency={rate.toCurrency}
                    />
                  </TableCell>
                  <TableCell className="text-sm">{rate.rate}</TableCell>
                  <TableCell className="text-sm font-medium text-success">
                    {rate.buyRate}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-danger">
                    {rate.sellRate}
                  </TableCell>
                  <TableCell className="px-4 text-sm text-muted-foreground">
                    {formatDate(rate.updatedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>
    </div>
  );
}
