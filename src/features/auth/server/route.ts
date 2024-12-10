import { Hono } from "hono";

const app = new Hono()
    .get("/current", async (c) => {
        const user = c.get("user");
        return c.json({ data: user });
    })

export default app;