import React from "react";

// The heading of the table.
const TableHead = () => (
  <thead>
    <tr>
      <th>Streamer</th>
      <th>Status</th>
      <th>Activity</th>
    </tr>
  </thead>
);

const formatStreamer = streamer => ( <a href={ `https://www.twitch.tv/${streamer.toLowerCase()}` } target="_blank"> { streamer } </a> );

// The row of the table.
const TableRow = props => (
  <tr key={props.streamer} className={ props.status === "Online" ? "online" : "offline" }>
    <td> { formatStreamer( props.streamer ) } </td>
    <td> { props.status } </td>
    <td> { props.activity } </td>
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