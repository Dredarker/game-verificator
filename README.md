# game-verificator

Simple HTTP server that echoes GET query parameters in the response body.

## Run

```bash
npm start
```

The server listens on port 3000 by default. Set the `PORT` environment variable to change it.

## Example

Request:

```
GET /?foo=bar&hello=world
```

Response body:

```
foo=bar
hello=world
```

Only GET requests are accepted. Other methods return `405 Method Not Allowed`.
