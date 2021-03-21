const express = require("express");
const fs = require("fs");
const path = require("path");

// sort inquiry based on created time
const sort = (arr, order) => {
  return arr.sort(function (a, b) {
    return order
      ? a.createdTime - b.createdTime
      : b.createdTime - a.createdTime;
  });
};

exports.getInquiries = (req, res) => {
  // query parameter to read ascending or descending order
  const order = req.query.order === "desc" ? true : false;
  // destination file to create and read post table
  const destination = path.join(__dirname, "..", "data", "inquiry.json");
  try {
    let items;
    // read post table
    fs.readFile(destination, (err, data) => {
      if (err) {
        items = [];
      } else {
        items = JSON.parse(data);
      }
      res.status(200).json({ success: sort(items, order) });
    });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};

exports.postInquiries = (req, res) => {
  const destination = path.join(__dirname, "..", "data", "inquiry.json");
  let items = [];
  try {
    fs.readFile(destination, "utf8", function (err, data) {
      if (data) {
        items = [...JSON.parse(data)];
      }
      const timeNew = new Date();
      const createdTime = timeNew.getTime();
      req.body.createdTime = createdTime;
      items.push(req.body);

      fs.writeFile(destination, JSON.stringify(items), function (err) {
        if (err) throw err;

        res.status(200).json({ success: "success" });
      });
    });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
};
