const app = require("express")();
const cors = require("cors");
const { json } = require("express");
const { connection } = require("./Configs/db");
const { authenticate } = require("./Middlewares/autheticate.middleware");
const { postRouter } = require("./Routes/Post.routes");
const { userRouter } = require("./Routes/User.routes");

app.use(cors());
app.use(json());
app.use("/", userRouter);
app.use("/", authenticate, postRouter);

app.listen(3000, async () => {
  try {
    await connection;
    console.log("conneted to 3000");
  } catch (error) {
    console.log("could'nt connect");
  }
});
