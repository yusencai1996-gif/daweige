import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "nodejs",
};

const app = new Hono().basePath("/api");

app.get("/", (c) =>
  c.json({ name: "project API", status: "ok" }),
);

app.get("/health", (c) =>
  c.json({ ok: true, time: new Date().toISOString() }),
);

app.get("/hello", (c) => {
  const name = c.req.query("name") ?? "world";
  return c.json({ message: `Hello, ${name}!` });
});

export default handle(app);
