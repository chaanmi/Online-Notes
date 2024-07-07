const notesContainer = document.querySelector(".notes-container");
const creatBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
        notesContainer.innerHTML = localStorage.getItem("notes");
        attachDeleteListeners();
        attachContentEditableListeners();
    }
    
function updateStorage() {
        localStorage.setItem("notes", notesContainer.innerHTML);
        
    }

    function attachDeleteListeners() {
        notesContainer.querySelectorAll("img").forEach(img => {
            img.addEventListener("click", function() {
                this.parentElement.remove();
                updateStorage();
            });
        });
    }

    function attachContentEditableListeners() {
        notesContainer.querySelectorAll(".input-box").forEach(note => {
            note.addEventListener("input", function() {
                updateStorage();
            });
        });
    }

creatBtn.addEventListener("click", ()=>{
        let inputBox = document.createElement("p");
        let img = document.createElement("img");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        img.src = "images/delete.png";
        notesContainer.appendChild(inputBox).appendChild(img);
        updateStorage();
        attachDeleteListeners();
        attachContentEditableListeners();
    });

    notesContainer.addEventListener("click", function(e){
            if(e.target.tagName === "IMG"){
                e.target.parentElement.remove();
                updateStorage();
            }
            else if(e.target.tagName === "p"){
                notes  = document.querySelectorAll(".input-box");
                notes.forEach(nt => {
                    nt.onkeyup = function(){
                        updateStorage();
                    }
                })
            }
        })

        document.addEventListener("keydown", event =>{
                if(event.key === "Enter"){
                    document.execCommand("insertLineBreak");
                    event.preventDefault();
                }
            })
            showNotes();