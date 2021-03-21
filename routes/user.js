const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// check if an email already exists
const checkUserEmail = (users, email) => {
  return users.some((value) => {
    return value.email == email;
  });
};

//check if user exists
const findUser = (users, email) => {
  return users.filter((value) => {
    return value.email == email;
  });
};

exports.signup = async (req, res) => {
  // providing every user a unique id
  req.body.id = uuidv4();

  const { name, email, password, role, id } = req.body;
  // creating a destination file for users table
  const destination = path.join(__dirname, "..", "data", "user.json");
  let users = [];
  try {
    // reading destination file to get users table
    fs.readFile(destination, "utf8", async (err, data) => {
      if (data) {
        users = [...JSON.parse(data)];
        const emailExist = checkUserEmail(users, req.body.email);
        // if email already exists in the table return error
        if (emailExist) {
          return res.status(400).json({ error: "user already exists" });
        }
      }
      // hashing the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      req.body.password = hashpassword;
      // adding new user to user table
      users.push(req.body);
      // saving user table in destination file
      fs.writeFile(destination, JSON.stringify(users), function (err) {
        if (err) throw err;

        res.status(200).json({ success: "success" });
      });
    });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const destination = path.join(__dirname, "..", "data", "user.json");
  let users = [];
  try {
    // reading destination file to get users table

    fs.readFile(destination, "utf8", async (err, data) => {
      try {
        if (data) {
          users = [...JSON.parse(data)];
          const emailExist = checkUserEmail(users, req.body.email);
          // if the email doesnt exist return as error
          if (!emailExist) {
            return res.status(400).json({ error: "No user found" });
          }
          // find user based on the email
          const user = findUser(users, email);
          // compare given password with user password
          const valid = await bcrypt.compare(password, user[0].password);
          // if wrong password return error
          if (!valid)
            return res.status(400).json({ error: "Invalid password" });
          // if password match create token
          const token = jwt.sign({ id: user.id }, "IlikeTastyTreats", {
            expiresIn: "24hr",
          });
          res.cookie("t", token);
          let { name, role } = user[0];
          return res
            .header({ "auth-token": token })
            .status(200)
            .json({ token, user: { name, role } });
        }
      } catch (error) {
        res.status(400).json({ error: "error" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.status(200).json({ msg: "Signed out" });
};

exports.needSignin = (req, res, next) => {
  const token = req.header("auth-token");
  // if no token return error
  if (!token)
    return res.status(400).json({ error: " Not authorised, Signin please" });
  try {
    // check token with secret string for verification
    const verify = jwt.verify(token, "IlikeTastyTreats");
    // if matched next middleware called
    next();
  } catch (error) {
    res.status(400).json({ error: "not authorised token" });
  }
};

// middleware incase admin route needed to be implemented
exports.needAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ error: "Admin material" });
  }
  next();
};
