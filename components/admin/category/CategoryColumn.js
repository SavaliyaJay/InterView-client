import moment from "moment";

export const getColumns = () => [
  {
    Header: "ID",
    accessor: "c_id"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ row }) => {
      return <span>{moment(`${row.original.created_at}`).format("MM-DD-YYYY")}</span>;
    }
  }
];
