import type {
  FC,
  PropsWithChildren,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export const EmailTable: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>
> = ({ children, ...props }) => (
  <table width="100%" className="my-6 border-collapse text-left" {...props}>
    {children}
  </table>
);

export const EmailTableHead: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => (
  <thead className="border-b border-gray-200" {...props}>
    {children}
  </thead>
);

export const EmailTableBody: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;

export const EmailTableRow: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableRowElement>>
> = ({ children, ...props }) => (
  <tr className="border-b border-gray-200" {...props}>
    {children}
  </tr>
);

export const EmailTableHeader: FC<
  PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <th className="px-4 py-3 font-semibold text-gray-900" {...props}>
    {children}
  </th>
);

export const EmailTableCell: FC<
  PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <td className="px-4 py-3 text-gray-700" {...props}>
    {children}
  </td>
);
