import type { FC, PropsWithChildren, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export const WebTable: FC<PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>> = ({ children, ...props }) => (
  <div className="my-6 w-full overflow-y-auto">
    <table className="w-full border-collapse text-left text-sm" {...props}>
      {children}
    </table>
  </div>
)

export const WebTableHead: FC<PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>> = ({
  children,
  ...props
}) => (
  <thead className="border-b border-border font-bold" {...props}>
    {children}
  </thead>
)

export const WebTableBody: FC<PropsWithChildren<TableHTMLAttributes<HTMLTableSectionElement>>> = ({
  children,
  ...props
}) => (
  <tbody className="divide-y divide-border" {...props}>
    {children}
  </tbody>
)

export const WebTableRow: FC<PropsWithChildren<TableHTMLAttributes<HTMLTableRowElement>>> = ({
  children,
  ...props
}) => (
  <tr className="border-b border-border transition-colors hover:bg-muted/50" {...props}>
    {children}
  </tr>
)

export const WebTableHeader: FC<PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>> = ({
  children,
  ...props
}) => (
  <th
    className="px-4 py-3 font-semibold text-foreground [&[align=center]]:text-center [&[align=right]]:text-right"
    {...props}
  >
    {children}
  </th>
)

export const WebTableCell: FC<PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>> = ({ children, ...props }) => (
  <td className="px-4 py-3 text-foreground [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
    {children}
  </td>
)
