const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const url = process.env.MONGO;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
      contact: {
        name: "Suryakanta Prusty",
      },
      servers: [
        {
          url: "http://localhost:5000", // Replace with your deployed URL
        },
      ],
    },
  },
  // [Where your API routes are located]
  apis: ["./routes/usersRoute.js "],
};

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", function () {
  console.log("Database is connected..");
});

const userRouter = require("./routes/usersRoute");

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
