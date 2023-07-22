exports.allAccess = (req, res) => {
    res.status(200).send("Race with time on TodoNow !");
};

exports.userBoard = (req, res) => {
    res.status(200).send("TODOS");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Race with time on TodoNow !");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Race with time on TodoNow !");
};