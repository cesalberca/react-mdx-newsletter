import type {
  FC,
  PropsWithChildren,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export const WebTable: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>
> = ({ children, ...props }) => (
  <div className="overflow-x-auto my-3">
    <table className="w-full border-collapse text-sm" {...props}>
      {children}
    </table>
  </div>
);

export const WebTableHead: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => (
  <thead className="border-b-2 border-border" {...props}>
    {children}
  </thead>
);

export const WebTableBody: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;

export const WebTableRow: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableRowElement>>
> = ({ children, ...props }) => (
  <tr className="border-b border-border-faint" {...props}>
    {children}
  </tr>
);

export const WebTableHeader: FC<
  PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <th className="text-left py-2 px-3 font-semibold text-foreground" {...props}>
    {children}
  </th>
);

export const WebTableCell: FC<
  PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <td className="py-2 px-3 border-b border-border-faint text-foreground" {...props}>
    {children}
  </td>
);
