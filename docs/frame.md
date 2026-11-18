# Module: frame

**File:** `\packages\ladle\lib\app\src\iframe\frame.tsx`

## Overview

Module `frame` contains 3 analyzed entities.

```
import React, { Component, ReactNode, RefObject } from "react";
import ReactDOM from "react-dom";
import { FrameContextProvider } from "./context";
import Content from "./content";

interface FrameProps {
  style?: React.CSSProperties;
  head?: ReactNode;
  title: string;
  className: string;
  initialContent?: string;
  mountTarget?: string;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
  children?: ReactNode | ReactNode[];
  forwardedRef?:
    | ((instance: HTMLIFrameElement | null) => void)
    | React.RefObject<HTMLIFrameElement>;
}

interface FrameState {
  iframeLoaded: boolean;
}

export class Frame extends Component<FrameProps, FrameState> {
  static defaultProps = {
    style: {},
    head: null,
    children: undefined,
    mountTarget: undefined,
    contentDidMount: () => {},
    contentDidUpdate: () => {},
    initialContent:
      '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
  };

  private _isMounted: boolean = false;
  private nodeRef: RefObject<HTMLIFrameElement | null> = React.createRef();

  constructor(props: FrameProps) {
    super(props);
    this.state = { iframeLoaded: false };
  }

  componentDidMount() {
    this._isMounted = true;

    const doc = this.getDoc();
    if (doc && doc.readyState === "complete") {
      this.forceUpdate();
    } else {
      this.nodeRef.current?.addEventListener("load", this.handleLoad);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.nodeRef.current?.removeEventListener("load", this.handleLoad);
  }

  getDoc() {
    return this.nodeRef.current ? this.nodeRef.current.contentDocument : null;
  }

  getMountTarget() {
    const doc = this.getDoc();
    if (this.props.mountTarget) {
      return doc?.querySelector(this.props.mountTarget);
    }
    return doc?.body.children[0];
  }

  setRef = (node: HTMLIFrameElement) => {
    //@ts-ignore
    this.nodeRef.current = node;

    const { forwardedRef } = this.props;
    if (t
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `frame.Frame` | class | No description |
| `frame.FrameProps` | interface | No description |
| `frame.FrameState` | interface | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
