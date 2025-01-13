const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./services/db");
const userRoute = require("./routes/usersRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const generalRoute = require("./routes/generalRoutes");

const port = process.env.PORT || 3920;

app.use((req, res, next, err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log("Server is running at", port);
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/general", generalRoute);
app.use(cors({ origin: true }));