const Players = require('../model/players');

class playerController {
    index(req, res, next) {
        Players.find({})
            .then((players) => {
                res.render("player", {
                    title: "List of Players",
                    playerData: players,
                    baseUrl: req.baseUrl,
                })
            })
            .catch(next);
    }
    create(req, res, next) {
        const playerName = req.body.name;
        Players.findOne({ name: playerName }).then((playername) => {
            if (playername !== null) {
                res.render("error", { errormessage: "Player already exist" , baseUrl : req.baseUrl})
            } else {
                const player = new Players(req.body);
                player
                    .save()
                    .then(() => res.redirect("/player"))
            }
        })
    }
    getInfo(req, res, next) {
        const playerId = req.params.playerId
        Players.findById(playerId).then((player) => {
            res.render("playerDetail", {
                title: "Player Information",
                player,
                baseUrl: req.baseUrl
            })
        })
    }
    update(req, res, next) {
        const playerID = req.params.playerId;
        const detail = req.body;
        Players.updateOne({ _id: playerID }, detail).then(() =>
            res.redirect("/player")
        )
    }
    remove(req, res, next) {
        const playerID = req.params.playerId;
        Players.deleteOne({ _id: playerID }).then(() =>
            res.redirect("/player")
        )

    }
}
module.exports = new playerController();