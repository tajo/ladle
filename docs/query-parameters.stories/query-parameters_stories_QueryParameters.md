# query-parameters.stories.QueryParameters

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\query-parameters.stories.tsx` (lines 4-12)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(location.search);
  }, [location.search]);

  return <p>Params: {queryParams}</p>;
}
```

## Docstring

_No docstring provided._

## Source

```
export const QueryParameters: Story = () => {
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(location.search);
  }, [location.search]);

  return <p>Params: {queryParams}</p>;
};
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
