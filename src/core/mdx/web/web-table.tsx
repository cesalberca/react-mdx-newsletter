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
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <table
      style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const WebTableHead: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => (
  <thead style={{ borderBottom: "2px solid var(--border-primary)" }} {...props}>
    {children}
  </thead>
);

export const WebTableBody: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>
> = ({ children, ...props }) => <tbody {...props}>{children}</tbody>;

export const WebTableRow: FC<
  PropsWithChildren<TableHTMLAttributes<HTMLTableRowElement>>
> = ({ children, ...props }) => (
  <tr style={{ borderBottom: "1px solid var(--border-light)" }} {...props}>
    {children}
  </tr>
);

export const WebTableHeader: FC<
  PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <th
    style={{
      textAlign: "left",
      padding: "8px 12px",
      fontWeight: 600,
      color: "var(--text-primary)",
    }}
    {...props}
  >
    {children}
  </th>
);

export const WebTableCell: FC<
  PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>
> = ({ children, ...props }) => (
  <td
    style={{
      padding: "8px 12px",
      borderBottom: "1px solid var(--border-light)",
      color: "var(--text-primary)",
    }}
    {...props}
  >
    {children}
  </td>
);
