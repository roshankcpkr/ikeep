class App{
    constructor()
    {
        this.notes = JSON.parse(localStorage.getItem("notesHaru")) || []
        this.form = document.querySelector("#form")
        this.noteTitle = document.querySelector('#note-title')
        this.noteTitleValue = ''
        this.noteTextValue = ''
        this.id = ''
        this.noteText = document.querySelector('#note-text')
        this.formButton = document.querySelector('#form-buttons')
        this.placeholder = document.querySelector('#placeholder')
        this.notesDiv = document.querySelector('#notes')
        this.closeButton = document.querySelector('#form-close')
        this.modal = document.querySelector('.modal')
        this.modalTitle = document.querySelector('.modal-title')
        this.modalText = document.querySelector('.modal-text')
        this.modalClose = document.querySelector('.modal-close')
        this.searchBar = document.querySelector('.searchbar')
        this.render()
        this.addEventListeners() 
    }
    addEventListeners()
    {
        document.body.addEventListener('click', event=>{
            this.handleFormClick(event)
            this.selectNote(event)
            this.openModal(event)
            this.deleteNote(event)
            this.closesModal(event)
            
        })
        this.form.addEventListener("submit", event=>{
            event.preventDefault()
            const title = this.noteTitle.value
            const text = this.noteText.value
            const haveNote = title || text
            if(haveNote)
            {
                this.addNote({title, text})
            }
        
        })
        this.modalClose.addEventListener("click", (event)=>{
            this.closeModal(event)
        })
        this.closeButton.addEventListener("click", (event)=>{
            event.stopPropagation()
            this.closeForm()
        })
        this.searchBar.addEventListener("input", (event)=>{
            event.preventDefault()
            this.searchNote(event)
        })

    }
    handleFormClick(event)
    {
        const isFormClicked = this.form.contains(event.target)
        const title = this.noteTitle.value
        const text = this.noteText.value
        const haveNote = title || text
        if(isFormClicked)
        {
            this.openForm()
        }
        else if(haveNote)
        {
            this.addNote({title, text})
        }
        else{
            this.closeForm()
        }
    }
    render()
    {
        this.displayNote(this.notes)
        this.saveNote()
    }
    searchNote(event)
    {
        
        let searchInput = event.target.value.toLowerCase()
        let newNotes = this.notes.filter((ele) =>{
          if(ele.text.toLowerCase().includes(searchInput) || ele.title.toLowerCase().includes(searchInput) )
          {
            return ele
          }
        })
        
        this.displayNote(newNotes)
    }
    openForm(){
        this.noteTitle.style.display = "block"
        this.formButton.style.display = "block"
        this.form.classList.add("form-open")

    }
    closeForm()
    {
        this.noteTitle.style.display = "none"
        this.formButton.style.display = "none"
        this.form.classList.remove("form-open")
        this.noteTitle.value = ""
        this.noteText.value =""

    }
    closesModal(event)
    {
            if(event.target.closest('.modal') && !event.target.closest('.modal-content'))
            {
                this.closeModal(event)
            }
    }
    closeModal(event)
    {
        this.editNote()
        this.modal.classList.toggle('openModal')
    }
    editNote()
    {
        this.noteTitleValue = this.modalTitle.value
        this.noteTextValue = this.modalText.value
        this.notes = this.notes.map(el=>{
           return el.id === Number(this.id) ? {...el, 
                title: this.noteTitleValue, 
                text: this.noteTextValue
            } : el

        })
        this.render()

    }
    openModal(event)
    {
        
        if(event.target.closest('.note') && !event.target.matches('#delete-icon'))
        {
            this.modal.classList.toggle('openModal')
            this.modalTitle.value = this.noteTitleValue
            this.modalText.value = this.noteTextValue
        }
    }
    addNote(note)
    {
        const newNote = {
            title: note.title,
            text: note.text,
            color: "white",
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.closeForm()
        this.render()
    }
    selectNote(event)
    {
        const selectNote = event.target.closest('.note')
        if(!selectNote)
        return
        const [noteTitle, noteText] = selectNote.children
        this.noteTitleValue = noteTitle.innerText
        this.noteTextValue = noteText.innerText
        this.id = selectNote.dataset.id
    }
    deleteNote(event)
    {
        event.stopPropagation()
        if(!event.target.matches('#delete-icon'))
        return
        const id = Number(event.target.dataset.id)

        this.notes = this.notes.filter(el=>{
           return  el.id !== id 
        })
        this.render()
    }

    saveNote()
    {
        localStorage.setItem("notesHaru", JSON.stringify(this.notes))
    }
    displayNote(noteArray)
    {
        const haveNote = noteArray.length > 0
        if(haveNote)
        {
            this.placeholder.style.display = "none"
            
        }
        else{
            this.placeholder.style.display = "flex"
        }
        const noteHtml =  noteArray.map((el)=>{
            return ` 
            <div class="note" style="background: ${el.color}" data-id = "${el.id}">
                <div class="${el.title && 'note-title'}" >${el.title}</div>
                <div class="note-text">${el.text}</div>
                <div class="tools">
                <span class="material-symbols-outlined" id="delete-icon" data-id = "${el.id}">
                        delete
                </span>
                </div>
            </div>
            
            `
        }).join(' ')
        this.notesDiv.innerHTML = noteHtml
    }

}
new App()
