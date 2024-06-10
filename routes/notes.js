import express from "express";
import {v4 as uuidv4} from "uuid";
import { addNote, notes, deleteNote, editNote } from "../persistence.js";


const router=express.Router();

router.post("/", (req, res) => {
        try{
        if(!req.body.noteText)
         {  
    res.status(400).send("empty field")
         }
         else{
    const newText= req.body.noteText;
    const newNote = {
        id: uuidv4(),
        text:newText
    };
    addNote(newNote);
res.redirect('/');
}}
catch(err){
        res.status(400).send(err)
}
    
})

router.delete("/:Id",(req,res)=>{
try{
        const id=req.params.Id;
        deleteNote(id);
        res.status(200).send("successful");
}
catch(err){
res.status(400).send(err);
}

})
router.put("/:Id",(req,res)=>{
        try{           
        const id=req.params.Id;
        let newText=req.body.newText;
        editNote(id,newText);
        res.status(200).send("successful");
        }
        catch(err){
        res.status(400).send(err);
        }
        
        })

export default router;