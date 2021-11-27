const db = require("../models");
const Contact = db.Contact;

// Defining methods for the productsController
module.exports = {
  findByContactName: function (req, res) {
    Contact
      .find({})
      // find by the product name, but exclude the id
      .select('contactName')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findAll: function(req, res) {
    Contact
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Contact
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    const newContact = new Contact({ ...req.body })
    newContact.save()
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Contact
      .findOneAndUpdate({ _id: req.params.id }, req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Contact
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // profit margin
};