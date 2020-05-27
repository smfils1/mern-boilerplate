import React, { Component, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import HistoryTable from "./HistoryTable";
const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const changePage = (event, value) => {
    setPage(value);
  };
  const columns = [
    {
      dataField: "count",
      title: "Count",
    },
    {
      dataField: "createdAt",
      title: "Time",
    },
    {
      dataField: "action",
      title: "Action",
    },
  ];
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="display-4 m-4">History Page {page}</div>
      <HistoryTable
        data={[
          {
            action: "+1",
            _id: "5ecd9126ce5ac95db9cb0ab2",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:02.903Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd9129ce5ac95db9cb0ab3",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:05.768Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab4",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.253Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab5",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.838Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd9129ce5ac95db9cb0ab3",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:05.768Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab4",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.253Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab5",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.838Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd9129ce5ac95db9cb0ab3",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:05.768Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab4",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.253Z",
            __v: 0,
          },
          {
            action: "+1",
            _id: "5ecd912ace5ac95db9cb0ab5",
            user: "5ec964c4e939c50c7e75cb24",
            count: 6,
            createdAt: "2020-05-26T21:59:06.838Z",
            __v: 0,
          },
        ]}
        columns={columns}
      />
      <Pagination
        count={50}
        showFirstButton
        showLastButton
        className="m-md-4 m-2"
        page={page}
        onChange={changePage}
      />
    </div>
  );
};

export default HistoryPage;
