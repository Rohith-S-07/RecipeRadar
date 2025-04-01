const express = require("express");
const router = express.Router();

const { addTag, getTags, deleteTag, upload } = require("../controllers/tagController");


router.post("/", upload.single("image"), addTag);
router.get("/", getTags);
router.delete("/:id", deleteTag);

module.exports = router;