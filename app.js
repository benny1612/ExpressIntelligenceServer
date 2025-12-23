import express from 'express'

const app = express()

const port = 3002;
app.get("/health", (req, res) => {
  res.json({ok : true});
});










app.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`);
});