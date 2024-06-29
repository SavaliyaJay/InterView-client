import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { getColumns } from "./CategoryColumn";
import { Typography } from "@material-tailwind/react";
import { selectCategoryList } from "@/redux/category/selectors";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";

const ViewCategory = () => {
  const dispatch = useDispatch();
  const { CategoryList } = useSelector(selectCategoryList);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => CategoryList, [CategoryList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <>
      <div className="bg-white rounded-xl">
        <table {...getTableProps()} className="w-full min-w-max table-auto text-center">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    className={` border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${index === 0 ? "rounded-tl-xl" : ""} ${index === headerGroup.headers.length - 1 ? "rounded-tr-xl" : ""}`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {column.render("Header")}
                    </Typography>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="even:bg-blue-gray-50/50">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {cell.render("Cell")}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewCategory;
