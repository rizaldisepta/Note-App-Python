import { Component, OnInit } from '@angular/core'
import {Note} from './note'
import {HttpClient} from '@angular/common/http'
import { NotesService } from './notes.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    providers: [NotesService]
})

export class NotesComponent implements OnInit {
    notes: Note[]
    editNote: Note

    constructor(private noteService: NotesService, private http: HttpClient){}

    ngOnInit(){
       this.getNotes()
       
    }

    getNotes():void{
        this.noteService.getNotes().subscribe(res => (
            this.notes = res,
            console.log(this.notes)
        ))
    }

    addNote(title: string): void {
        this.editNote = undefined
        title = title.trim()
        if(!title){
            return
        }
        const newNote: Note = {title} as Note
        this.noteService.addNote(newNote).subscribe(() => this.getNotes())
    }

    deleteNote(note: Note): void{
        this.notes = this.notes.filter(res => res != note)
        this.noteService.deleteNote(note._id).subscribe(() => console.log("Note Deleted"))
    }

    edit(note){
        this.editNote = note
    }

    updateNote(){
        if (this.editNote){
            this.noteService.updateNote(this.editNote).subscribe(() => {
                this.getNotes()
            })
            this.editNote = undefined
        }
    }

}