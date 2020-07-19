import React from "react";

export default class Deep extends React.Component {
  state = {
    flag: true,
  };

  render() {
    return (
      <button onClick={() => this.setState({ flag: false })}>
        flag button {this.state.flag ? "true" : "false"}
      </button>
    );
  }
}
