import express from 'express'
import userRouts from "./routes/usersR.js"
import agentRouts from "./routes/agentsR.js"
import reportRouts from "./routes/reportsR.js"

const app = express()
app.use(express.json())

const port = 3002;
app.get("/health", (req, res) => {
  res.json({ok : true});
});
app.use("/users", userRouts)
app.use("/agents", agentRouts)
app.use("/reports", reportRouts)









app.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`);
});