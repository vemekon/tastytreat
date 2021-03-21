const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// app
const app = express();

// db
const { getInquiries, postInquiries } = require("./routes/post");
const { signup, signin, needSignin, signout } = require("./routes/user");

// middlewares
// morgan for request logger for better development
app.use(morgan("dev"));
app.use(bodyParser.json());
//Cross-origin resource sharing for access from different web requests
app.use(cors());

app.get("/inquiries", needSignin, getInquiries);
app.post("/", postInquiries);
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/signout", signout);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
