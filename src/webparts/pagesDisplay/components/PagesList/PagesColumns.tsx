import * as React from "react";
import { IColumn, IDetailsColumnProps } from "@fluentui/react";
import { IColumnInfo } from "./PagesService";
import { HeaderRender } from "../common/ColumnDetails";
/**
 * Returns an array of IColumn objects representing the columns of the PagesDetailsList component.
 *
 * @param {(column: IColumn) => void} onColumnClick - The function to call when a column is clicked.
 * @param {string} sortBy - The column to sort by.
 * @param {boolean} isDescending - Whether the sort order is descending.
 * @param {(column: IColumn) => void} setShowFilter - The function to set the showFilter state.
 * @return {IColumn[]} An array of IColumn objects representing the columns of the PagesDetailsList component.
 */
export const PagesColumns = (
  columns: IColumnInfo[],
  onColumnClick: (column: IColumn) => void, // The function to call when a column is clicked
  sortBy: string, // The column to sort by
  isDescending: boolean, // Whether the sort order is descending
  setShowFilter: (column: IColumn, columnType: string) => void // The function to set the showFilter state
): IColumn[] => {
  return columns.map((column: IColumnInfo) => {
    return {
      key: column.InternalName,
      name: column.DisplayName,
      fieldName: column.InternalName,
      minWidth: column.MinWidth,
      maxWidth: column.MaxWidth,
      isRowHeader: true,
      isResizable: true,
      isPadded: true,
      isSorted: sortBy === column.InternalName,
      isSortedDescending: isDescending,
      onRenderHeader: (item: IDetailsColumnProps) =>
        HeaderRender(
          item.column,
          column.ColumnType,
          onColumnClick,
          setShowFilter
        ),
      onRender: column.OnRender
        ? column.OnRender
        : (item: any) => <div>{item[column.InternalName]}</div>,
    };
  });
};
