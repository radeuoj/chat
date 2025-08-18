import express from "express";

const app = express();

app.get("/api", (_req, res) => {
  console.log("Hello from web")
  res.send("Hello api");
});

app.use(express.static("dist"));
app.use((_req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.listen(3000);