# AngoraNet

This repository contains a minimal Flask application exposing a `/messages` endpoint.

Both **POST** and **PUT** requests to `/messages` must send JSON payloads and include the header `Content-Type: application/json`.

Example using `curl`:

```bash
curl -X PUT http://localhost:5000/messages \
     -H 'Content-Type: application/json' \
     -d '{"content": "hello"}'
```
