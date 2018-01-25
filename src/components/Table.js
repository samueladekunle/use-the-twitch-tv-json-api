import React from "react";

// The heading of the table.
const TableHead = () => (
  <thead>
    <tr>
      <th>Streamer</th>
      <th>Status</th>
    </tr>
  </thead>
);

// The row of the table.
const TableRow = props => (
  <tr key={props.streamer}>
    <td> { props.streamer } </td>
    <td> { props.status } </td>
  </tr>
);

// The Table Component.
const Table = props => (
  <div className="row">
    <div className="column">
      <table>
        <TableHead />
        <tbody>
          { props.rows }
        </tbody>
      </table>
    </div>
  </div>
);

// Export the table row.
export { TableRow };

// Export the Table component.
export default Table;