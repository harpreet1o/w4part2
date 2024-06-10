import express from "express";
import {v4 as uuidv4} from "uuid";
import { addNote, notes, deleteNote, editNote } from "../persistence.js";


const router=express.Router();

router.post("/", (req, res) => {
    try{
        if(!req.body.noteText)
         {
            //as return status error is causing to go to the /notes page
    res.redirect("/");

         }
         else{
    const newText= req.body.noteText;


    const newNote = {
        id: uuidv4(),
        text:newText
    };
    addNote(newNote);
  
    // res.render('index', { title: 'Notes', notes: notes() });
    res.redirect("/");
}
    }
catch(err){
res.status(400).json(err);
}
})
export default router;