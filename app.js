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
        this.colorTool = document.querySelector('#color-tool')
        this.render()
        this.addEventListeners() 
    }
    htmlEncode(str) {
        return String(str).replace(/[^\w. ]/gi, function(c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
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
        document.body.addEventListener("mouseover", (event)=>{
            this.openColorTool(event)
        })
        document.body.addEventListener("mouseout", (event)=>{
            this.closeColorTool(event)
        })
        this.colorTool.addEventListener("mouseover" ,function(){
                this.style.display = "flex";
        })
        this.colorTool.addEventListener("mouseout" ,function(){
            this.style.display = "none";
        })
        this.colorTool.addEventListener("click", event=>{
            const color = event.target.dataset.color
            if(color)
            {
                this.editColor(color)
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
        
        this.saveNote()
        this.displayNote(this.notes)
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
    openColorTool(event)
    {
        if(!event.target.matches('#color-icon'))
        return
        this.id = event.target.dataset.id
        const coord = event.target.getBoundingClientRect()
        const horizontal = coord.left 
        const vertical = coord.top 
        this.colorTool.style.transform = `translate(${horizontal}px , ${vertical}px)`
        this.colorTool.style.display = "flex"
    }
    closeColorTool(event){
        if(!event.target.matches('#color-icon'))
        return 
        this.colorTool.style.display = "none"
    }
    editColor(color)
    {
        console.log(this.id)
       this.notes =  this.notes.map(el=>{
            return el.id === Number(this.id) ? {...el, color } : el
        })
        this.render()
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
            console.log(this.notes)
            const selectedElement = this.notes.filter((element)=>{
                if(Number(this.id) === element.id)
                {
                    return element
                }
            })[0]
            this.modalTitle.value = selectedElement.title
            this.modalText.value = selectedElement.text
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
        if (haveNote){
            const noteHtml =  noteArray.map((el)=>{
                const lenOfChar = el.text.split(" ")
                const textWord = lenOfChar.length > 50 ? lenOfChar.slice(0, 60) : lenOfChar
                const limitedArray = textWord.map((els)=>{
                    return els
                }).join(" ")
                return ` 
                <div class="note" style="background: ${el.color}" data-id = "${el.id}">
                    <div class="${el.title && 'note-title'}" >${el.title}</div>
                    <div class="note-text">${this.htmlEncode(limitedArray)}</div>
                    <div class="tools">
                        <span class="material-symbols-outlined" id="delete-icon" data-id = "${el.id}">
                                delete
                        </span>
                        <span class="material-symbols-outlined" id="color-icon" data-id = "${el.id}">
                        palette
                        </span>
                    </div>
                </div>
                
                `
            }).join(' ')
            this.notesDiv.innerHTML = noteHtml
        }
        else{
            this.notesDiv.innerHTML = ""
        }

    }

}
new App()
