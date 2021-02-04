const db = require("../dbSimulator/db");

exports.participant_create = (req, res) => {
    db.addParticipant(req.body);
    res.send(req.body);
};
