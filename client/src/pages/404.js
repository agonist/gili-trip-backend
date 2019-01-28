import React from "react";

class NotFoundPage extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.makeReady();
  }

  makeReady = () => {
    const { isReady } = this.state;

    if (!isReady) {
      this.setState({
        isReady: true,
      });
    }
  };

  render() {
    const { isReady } = this.state;

    return isReady ? (
      <div>
        <h1>404 </h1>
      </div>
    ) : null;
  }
}

export default NotFoundPage;
