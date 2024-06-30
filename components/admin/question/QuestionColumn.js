import moment from "moment";

export const getColumns = () => [
  {
    Header: "ID",
    accessor: "q_id"
  },
  {
    Header: "Sub Category",
    accessor: "subCategory.name"
  },
  {
    Header: "Question",
    accessor: "question"
  },
  {
    Header: "Created At",
    accessor: "created_at",
    Cell: ({ row }) => {
      return <span>{moment(`${row.original.created_at}`).format("MM-DD-YYYY")}</span>;
    }
  }
];
