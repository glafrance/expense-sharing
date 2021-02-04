const express = require("express");
const bodyParser = require('body-parser');
const participant = require("./routes/participantRoutes");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use("/participant", participant);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
