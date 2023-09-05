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
  private nodeRef: RefObject<HTMLIFrameElement> = React.createRef();

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
    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      //@ts-ignore
      forwardedRef.current = node;
    }
  };

  handleLoad = () => {
    this.setState({ iframeLoaded: true });
  };

  renderFrameContents() {
    if (!this._isMounted) {
      return null;
    }

    const doc = this.getDoc();

    if (!doc) {
      return null;
    }

    const contentDidMount = this.props.contentDidMount;
    const contentDidUpdate = this.props.contentDidUpdate;

    const win = doc.defaultView || (doc as any).parentView;
    const contents = (
      <Content
        contentDidMount={contentDidMount}
        contentDidUpdate={contentDidUpdate}
      >
        <FrameContextProvider value={{ document: doc, window: win }}>
          <div className="frame-content">{this.props.children}</div>
        </FrameContextProvider>
      </Content>
    );

    const mountTarget = this.getMountTarget();

    return [
      ReactDOM.createPortal(this.props.head, (this.getDoc() as any).head),
      ReactDOM.createPortal(contents, mountTarget as Element),
    ];
  }

  render() {
    const props = {
      ...this.props,
      srcDoc: this.props.initialContent,
      children: undefined,
    };
    delete props.head;
    delete props.initialContent;
    delete props.mountTarget;
    delete props.contentDidMount;
    delete props.contentDidUpdate;
    delete props.forwardedRef;
    return (
      <iframe {...props} ref={this.setRef} onLoad={this.handleLoad}>
        {this.state.iframeLoaded && this.renderFrameContents()}
      </iframe>
    );
  }
}

export default React.forwardRef<HTMLIFrameElement, FrameProps>((props, ref) => (
  <Frame {...props} forwardedRef={ref as any} />
));
