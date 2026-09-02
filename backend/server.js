// start server
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// connect to db (MongoDB)
connectDB();

// start listning server
const server = app.listen(3000, () => console.log("Listening on port 3000"));
server.timeout = 300000; // 5 minutes for large uploads
server.keepAliveTimeout = 65000;
