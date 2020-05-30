import React, { Component, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { fetchHistory } from "../redux/actions/history";
import HistoryTable from "./HistoryTable";

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const history = useSelector(({ history }) => history);
  const dispatch = useDispatch();
  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchHistory(page, 10));
  }, [page]);

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
      <div className="display-4 m-4">History</div>
      {history.logs.length > 0 ? (
        <HistoryTable data={history.logs} columns={columns} />
      ) : (
        <Alert variant="info">There is no history</Alert>
      )}
      {history.logs.length > 0 && (
        <Pagination
          count={history.maxPages}
          showFirstButton
          showLastButton
          className="m-md-4 m-2"
          page={page}
          onChange={changePage}
        />
      )}
    </div>
  );
};

export default HistoryPage;
