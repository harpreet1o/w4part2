let _notes = [
    { id: "2", text: "CPSC 2650" },
    { id: "1", text: "An awesome web dev Note" },
  ];
  
  // TODO: implement addNote and removeNote
  // For fun: why do we export a function instead of notes directly?
  const notes = () => _notes;
  function addNote(note){
    _notes.push(note);
  }
  function editNote(noteId,newText){
   _notes= _notes.map((a)=>{
    if(a.id==noteId)
      return({...a,text:newText})
    else
    return a;
   }
)
  }
  function deleteNote(noteId){
    _notes=_notes.filter(a=>a.id!=noteId)
  }
  
  export { notes,addNote,deleteNote,editNote };
