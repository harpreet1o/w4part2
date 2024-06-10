

document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn"); 
    deleteButtons.forEach(button => {
        button.addEventListener("click",  async function(){
            const noteId = this.getAttribute("data-id");
            console.log(noteId);
           await fetch(`/notes/${noteId}`,{
                method:'DELETE',
            }).then((response)=>{if(response.status==200){
                const noteItem = this.parentNode;
                noteItem.remove();

                }
            })
         })
            
    })
    const saveButtons = document.querySelectorAll(".edit-btn");
    console.log(saveButtons);
    saveButtons.forEach(button => {
        button.addEventListener("click",  async function(){
            const noteId = this.getAttribute("data-id");
            console.log(noteId);
            let newText=this.parentNode.textContent;
            newText = newText.slice(0, -10);
           
           await fetch(`/notes/${noteId}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ newText: newText })  
            })
         })
     })

 ;})