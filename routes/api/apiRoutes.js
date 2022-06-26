const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "../../db/db.json"))
);

router.post("/notes", (req, res) => {
	const { title, text } = req.body;
	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		};

		fs.readFile(
			path.join(__dirname, "../../db/db.json"),
			"utf8",
			(err, data) => {
				if (err) {
					console.error(err);
				} else {
					const noteArray = JSON.parse(data);
					noteArray.push(newNote);

					fs.writeFile(
						path.join(__dirname, "../../db/db.json"),
						JSON.stringify(noteArray),
						(err) => (err ? console.error(err) : res.json(newNote))
					);
				}
			}
		);
	}
});

router.delete("/notes/:id", (req, res) => {
	const noteId = req.params.id;

	fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
		if (err) console.error(err);

		const noteArray = JSON.parse(data);
		const newNoteArray = noteArray.filter((note) => noteId !== note.id);

		res.send(newNoteArray);

		fs.writeFile(
			path.join(__dirname, "../../db/db.json"),
			JSON.stringify(newNoteArray),
			(err) => {
				if (err) console.error;
			}
		);
	});
});
module.exports = router;
