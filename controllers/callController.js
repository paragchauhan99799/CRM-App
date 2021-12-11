const db = require("../models");
const Call = db.Call;
const moment = require('moment')

// Defining methods for the productsController
module.exports = {
  findByCallName: function (req, res) {
    Call
      .find({})
      // find by the product name, but exclude the id
      .select('callName')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findAll: function(req, res) {
    Call
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Call
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    const newCall = new Call({ ...req.body, time:moment(req.body.time).format('YYYY-MM-DD hh:mm') })
    newCall.save()
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Call
      .findOneAndUpdate({ _id: req.params.id }, req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Call
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // profit margin
};