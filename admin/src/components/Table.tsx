import React from "react";

interface TableProps {
  columns: string[];
  data: any[];
  renderRow?: (row: any, idx: number) => React.ReactNode;
  emptyText?: string;
}

export const Table: React.FC<TableProps> = ({ columns, data, renderRow, emptyText = "No data found." }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 border-b bg-gray-50 text-left text-sm font-semibold text-gray-700">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-400">{emptyText}</td>
          </tr>
        ) : renderRow ? (
          data.map((row, idx) => renderRow(row, idx))
        ) : (
          data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 border-b text-sm">{row[col]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
