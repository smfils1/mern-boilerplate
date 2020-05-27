import React from "react";
import Table from "react-bootstrap/Table";

function HistoryTable(props) {
  const { columns, data } = props;

  const createTableObj = (columns, data) => {
    const headers = (
      <thead>
        <tr>
          {columns.map(({ title }) => (
            <th
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

    let body = data.map((row) => {
      const newRow = [];
      for (const field of dataFields) {
        if (field === "createdAt") {
          newRow.push(
            <td className="p-md-3">{new Date(row[field]).toString()}</td>
          );
        } else {
          newRow.push(<td className="p-md-3">{row[field]}</td>);
        }
      }
      return <tr>{newRow}</tr>;
    });
    body = <tbody>{body}</tbody>;
    return { headers, body };
  };

  const { headers, body } = createTableObj(columns, data);
  console.log(headers);
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
