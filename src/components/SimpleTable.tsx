import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "../utils/capitalize";

export type ColumnDefType<C, R> = {
  key: C;
  label: string;
  render: (row: R) => ReactNode;
};

export function SimpleTable<C extends string, R extends { id: string }>({
  data,
  columns,
  initialVisibleColumns,
  "aria-label": ariaLabel,
}: {
  data: R[];
  columns: ColumnDefType<C, R>[];
  initialVisibleColumns: C[];
  "aria-label": string;
}) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns)
  );
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [page, setPage] = useState(1);

  const pages = Math.ceil(data.length / rowsPerPage);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [columns, visibleColumns]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, rowsPerPage]);

  const renderCell = useCallback(
    (vault: (typeof data)[0], columnKey: C) => {
      const column = columns.find((c) => c.key === columnKey);
      if (!column) return null;
      return column.render(vault);
    },
    [columns]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
          <span className="text-default-400 text-small">
            Rows: {data.length}
          </span>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="flex">
                <Button
                  endContent={<ChevronDownIcon className="text-pretty" />}
                  variant="flat"
                  color="warning"
                >
                  Column Selection
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    visibleColumns,
    setVisibleColumns,
    onRowsPerPageChange,
    data.length,
    columns,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage, setPage]);

  return (
    <Table
      color="warning"
      selectionMode="none"
      defaultSelectedKeys={[]}
      aria-label={ariaLabel}
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[600px]",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columns={headerColumns as any as { key: string; label: string }[]}
      >
        {(column) => (
          <TableColumn key={column.key} align="start" allowsSorting={false}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={pageItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <TableCell>{renderCell(item, columnKey as any)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
