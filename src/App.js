// Import React.
import React, { Component } from 'react';

// Import jsonp.
import jsonp from "jsonp";

// Import Roboto font.
import "./css/fonts/Roboto.css";

// Import Normalize css.
import "./css/normalize/normalize.css";

// Import Milligram css.
import "milligram/dist/milligram.min.css";

// Import Custom css.
import "./css/custom/style.css";

// The list of streamers given.
const streamers = [ "freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas" ];

// The title of the page.
const Title = () => (
  <h1>Twitch Streamers</h1>
);

// The form filter.
const Filter = () => (
  <form>
    <label htmlFor="filter">Filter</label>
    <select id="filter">
      <option value="all">All</option>
      <option value="offline">Offline</option>
      <option value="online">Online</option>
    </select>
  </form>
);

// The Header component.
const Header = () => (
  <header className="row">
    <div className="column">
      <Title />
    </div>
    <div className="column">
      <Filter />
    </div>
  </header>
);


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

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialise the state object.
    this.state = {
      stream: []
    };

    // Bind the callJSONP instance method to this.
    this.callJSONP = this.callJSONP.bind(this);

    // Populate the this.state.stream array
    // withe the details of streamers fetched
    // from the Twitch.tv API.
    streamers.forEach(this.callJSONP);
  }
  callJSONP(streamer) {
  // The Twitch.tv JSON API workaround provided by freeCodeCamp.
    const api = `https://wind-bow.glitch.me/twitch-api/streams/${streamer}`;
    let status = "Not Exist";
    
    jsonp(api, (err, data) => {
      try {
        if (err) {
          throw new Error("Something happened.");
        }

        if ( data.hasOwnProperty("stream") ) {
          status = data["stream"] ? `${data["stream"]["game"]}: ${data["stream"]["channel"]["status"]}` : "Offline";
        }

        const stream = this.state.stream;
        stream.push( { streamer, status } );
        this.setState( { stream } );

      } catch(err) {
        console.log(err.message);
      }
    });
  }
  render() {
    const stream = this.state.stream;
    const rows = stream.map(TableRow);

    return (
      <div className="container">
        <Header />
        <Table rows={ rows } />
      </div>
    );
  }
}