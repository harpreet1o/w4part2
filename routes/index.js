import express from "express";
import {notes} from "../persistence.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const note=notes();
  res.render("index", { title: "Yay node!",notes:note });
});

export default router;
