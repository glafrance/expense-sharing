const fs = require("fs");

const participantsStore = [];

exports.addParticipant = (participant) => {
    participantsStore.push(participant);
};

exports.getParticipants = () => {
    return participantsStore.slice();
}
