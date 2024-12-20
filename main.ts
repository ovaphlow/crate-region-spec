import "jsr:@std/dotenv/load";
import { Hono } from "hono";
import { cors } from "hono/cors";
import exportRoute from "./router/export.ts";

const app = new Hono();

app.use("*", cors());

const uriPrefix = "/crate-region-spec-api";

app.route(uriPrefix + "/export", exportRoute);

const port = Number(Deno.env.get("PORT")) || 8423;
Deno.serve({ port }, app.fetch);
