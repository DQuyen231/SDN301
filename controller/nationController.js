const Nations = require('../model/nations');

class nationController {
    index(req, res, next) {
        Nations.find({})
            .then((nations) => {
                res.render("nation", {
                    title: "List of Nations",
                    nationData: nations,
                    baseURL: req.baseUrl,
                    errormessage : ""
                })
            })
            .catch(next);
    }
    create(req, res, next) {
        const nationName = req.body.name;
        Nations.findOne({ name: nationName }).then((nationame) => {
            if (nationame !== null) {
                res.render("error", { errormessage: "Nation already exist" , baseUrl : req.baseUrl})
            } else {
                const nation = new Nations(req.body);
                nation
                    .save()
                    .then(() => res.redirect("/nation"))
            }
        })
    }
    formData(req, res, next) {
        const nationId = req.params.nationId;
        Nations.findById(nationId).then((data) => {
            res.render("nationDetail", {
                title: "Nation Information",
                data,
                baseUrl: req.baseUrl,
            })
        })
    }
    update(req, res, next) {
        const nationID = req.params.nationId;
        const detail = req.body;
        Nations.updateOne({ _id: nationID }, detail).then(() =>
            res.redirect("/nation")
        )
    }
    remove(req, res, next) {
        const nationID = req.params.nationId;
        Nations.deleteOne({ _id: nationID }).then(() =>
            res.redirect("/nation")
        )

    }

}
module.exports = new nationController();