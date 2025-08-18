import { Application, Router } from "@oak/oak";

const app = new Application();
const router = new Router();

router.get("/test", (ctx) => {
  ctx.response.body = "hello world";
});

app.use(router.routes());

app.use(async (ctx) => {
  await ctx.send({ 
    root: `${Deno.cwd()}/dist`,
    index: "index.html",
  });
});

app.listen({ port: 3000 });

