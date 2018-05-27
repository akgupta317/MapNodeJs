const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var fs = require('fs');

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get("/unique", (req, res, next) => {  // find duplicate recoreds in json
  Product.aggregate([
    { $group: { 
    _id: { Company: "$Company", ExperienceRequired: "$ExperienceRequired",JobLocation: "$JobLocation" },
    uniqueIds: {$addToSet: "$JobURL"},
    count: {$sum: 1}
     
  }},
  {$match: { 
        count: {"$gt": 1}
        
  }}
], function (err, result) {
  if (err) {
            console.log(err);
            res.status(500).json({error: err});
        }
         res.status(200).json(result);
      });
});

router.post("/withparameterid", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    Jobtitle: req.body.Jobtitle,
    Company: req.body.Company,
    ExperienceRequired: req.body.ExperienceRequired,
    JobLocation: req.body.JobLocation,
    SkillsRequired: req.body.SkillsRequired,
    JobDescription: req.body.JobDescription,
    JobID: req.body.JobID,
    Salary: req.body.Salary,
    PostedOn: req.body.PostedOn,
    PostedBy: req.body.PostedBy,
    Vacancies: req.body.Vacancies,
    Role: req.body.Role,
    Qualification: req.body.Qualification,
    JobURL: req.body.JobURL,
    MaximumSalary: req.body.MaximumSalary,
    Urgency: req.body.Urgency,
    HostingPortal: req.body.HostingPortal,
    ClosureDate: req.body.ClosureDate,
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {

fs.readFile("../NodeJSAPI/API/models/Buyeruser.json",'utf8', function (err, data)  {
if (err) throw err;
 const json = JSON.parse(data);
 console.log(json.length-1);

for (var i = json.length - 1; i >= 0; i--) {
    const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    Jobtitle: json[i].Jobtitle,
    Company: json[i].Company,
    ExperienceRequired: json[i].ExperienceRequired,
    JobLocation: json[i].JobLocation,
    SkillsRequired: json[i].SkillsRequired,
    JobDescription: json[i].JobDescription,
    JobID: json[i].JobID,
    Salary: json[i].Salary,
    PostedOn: json[i].PostedOn,
    PostedBy: json[i].PostedBy,
    Vacancies: json[i].Vacancies,
    Role: json[i].Role,
    Qualification:json[i].Qualification,
    JobURL: json[i].JobURL,
    MaximumSalary: json[i].MaximumSalary,
    Urgency: json[i].Urgency,
    HostingPortal: json[i].HostingPortal,
    ClosureDate: json[i].ClosureDate,
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Data got success fully uploaded",
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


});   //end of file read


  
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/", (req, res, next) => {
  Product.remove()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;