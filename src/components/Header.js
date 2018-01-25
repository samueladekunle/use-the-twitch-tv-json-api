import React from "react";

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

// Export the Header component.
export default Header;