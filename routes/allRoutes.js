const express = require('express')
const router = express.Router()
const Customer = require("../models/CustomerSchema");
const moment = require("moment");

// ---------------------------------------------------------------------------
// Get Request

router.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      res.render("index", { array: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/add.html", (req, res) => {
  res.render("user/add.ejs");
});

router.get("/edit/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/edit.ejs", { object: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/view/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/view.ejs", { object: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// ---------------------------------------------------------------------

// Post Request
router.post("/user/add.html", (req, res) => {
  Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Search
router.post("/search", (req, res) => {
  const searchText = req.body.searchText.trim();
  Customer.find({
    $or: [{ firstName: searchText }, { lastName: searchText }],
  })
    .then((result) => {
      res.render("user/search.ejs", { array: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// ---------------------------------------------------------------------------------------------------

// Delete Request
router.delete("/delete/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/edit-delete/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ----------------------------------------------------------------------------------------------------
// Put Request
router.put("/update/:id", (req, res) => {
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ------------------------------------------------------------------------------------------------------

module.exports = router