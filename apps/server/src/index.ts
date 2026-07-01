import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) =>
  c.json({ name: "project API", status: "ok" }),
);

app.get("/api/health", (c) =>
  c.json({ ok: true, time: new Date().toISOString() }),
);

app.get("/api/hello", (c) => {
  const name = c.req.query("name") ?? "world";
  return c.json({ message: `Hello, ${name}!` });
});

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API server running at http://localhost:${info.port}`);
});
