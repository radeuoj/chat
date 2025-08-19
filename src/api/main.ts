import express from "express";
import expressWs from "express-ws";
import { handleChat } from "./chat";

const { app, applyTo, getWss } = expressWs(express());
const router = express.Router();
applyTo(router);

// Test
router.get("/", (req, res) => {
  console.log("Hello from web")
  res.send("Hello api");
});

router.ws("/echo", (ws, req) => {
  ws.on("message", msg => {
    ws.send(msg);
  });
})

router.ws("/chat", (ws, req) => handleChat(ws, req, getWss()));

app.use("/api", router);

// React app
app.use(express.static("dist"));
app.use((req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

app.listen(3000);
console.log("Listening to http://localhost:3000");