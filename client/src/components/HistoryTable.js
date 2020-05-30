import React from "react";
import Table from "react-bootstrap/Table";

function HistoryTable(props) {
  const { columns, data } = props;
  const createTableObj = (columns, data) => {
    const headers = (
      <thead>
        <tr>
          {columns.map(({ title }, index) => (
            <th
              key={index}
              className="p-3 text-center"
              style={{
                fontSize: "1.5em",
              }}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
    );
    const dataFields = columns.map(({ dataField }) => dataField);

    let body = data.map((row, index1) => {
      const newRow = [];
      dataFields.forEach((field, index2) => {
        if (field === "createdAt") {
          newRow.push(
            <td key={index1 + index2 + ""} className="p-md-3">
              {new Date(row[field]).toString()}
            </td>
          );
        } else {
          newRow.push(
            <td key={index1 + index2 + ""} className="p-md-3">
              {row[field]}
            </td>
          );
        }
      });
      return <tr key={index1}>{newRow}</tr>;
    });

    body = <tbody>{body}</tbody>;
    return { headers, body };
  };

  const { headers, body } = createTableObj(columns, data);

  return (
    <div>
      <Table striped bordered hover variant="dark" responsive>
        {headers}
        {body}
      </Table>
    </div>
  );
}

export default HistoryTable;
