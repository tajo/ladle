import React, { Component, ReactElement } from "react";

interface ContentProps {
  children: ReactElement;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
}

export default class Content extends Component<ContentProps> {
  componentDidMount() {
    this.props.contentDidMount && this.props.contentDidMount();
  }

  componentDidUpdate() {
    this.props.contentDidUpdate && this.props.contentDidUpdate();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
