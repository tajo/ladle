import * as React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
