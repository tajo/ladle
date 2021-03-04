/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from "react";

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
