# content.Content

- **Type:** class
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\iframe\content.tsx` (lines 9-21)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class Content extends Component<ContentProps> {
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
```

## Docstring

_No docstring provided._

## Source

```
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
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
