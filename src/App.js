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

// Import the Header component.
import Header from "./components/Header";

// Import the Table component.
import Table, { TableRow } from "./components/Table";

// Import the list of streamers.
import streamers from "./data/Streamers.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialise the state object.
    this.state = {
      stream: []
    };

    // Bind the callJSONP instance method to this.
    this.callJSONP = this.callJSONP.bind(this);

    // Bind this to the filterStreamers() method.
    this.filterStreamers = this.filterStreamers.bind(this);

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
  filterStreamers(event) {
    console.log(event.target.value);
  }
  render() {
    const stream = this.state.stream;
    const rows = stream.map(TableRow);

    return (
      <div className="container">
        <Header filter={ this.filterStreamers } />
        <Table rows={ rows } />
      </div>
    );
  }
}