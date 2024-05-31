---
"@ladle/react": minor
---

Add option to disable http2 when using https. We observed that some bigger Ladle instances throw ERR_HTTP2_PROTOCOL_ERROR errors after upgrading from Node18 to Node20. This setting can be used as a workaround.
