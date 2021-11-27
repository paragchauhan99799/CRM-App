const db = require("../models");
const Meeting = db.Meeting;

// Defining methods for the productsController
module.exports = {
  findByMeetingName: function (req, res) {
    Meeting
      .find({})
      // find by the product name, but exclude the id
      .select('meetingName')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findAll: function(req, res) {
    Meeting
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Meeting
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    const newMeeting = new Meeting({ ...req.body })
    newMeeting.save()
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Meeting
      .findOneAndUpdate({ _id: req.params.id }, req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Meeting
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // profit margin
};