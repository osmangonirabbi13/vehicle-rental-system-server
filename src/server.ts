import express, { Request, Response } from "express";
const app = express();
const PORT = 5000



// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

app.listen(PORT, () => {
  console.log(`Server is running on post ${PORT}`);
});

