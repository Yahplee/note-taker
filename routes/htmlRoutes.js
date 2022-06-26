const path = require("path");
const router = require("express").Router();

// making the html page as the root folder of server
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
