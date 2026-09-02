// start server
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// connect to db (MongoDB)
connectDB();

// start listning server
app.listen(3000, () => console.log("Listening on port 3000"));
