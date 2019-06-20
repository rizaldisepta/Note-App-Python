import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {Observable} from 'rxjs'
import {Note} from './note'

@Injectable()
export class  NotesService {
    constructor(private http: HttpClient){}

    getNotes(): Observable<Note[]>{
        return this.http.get<Note[]>('api/notes')
    }

    addNote(note: Note): Observable<Note>{
        return this.http.post<Note>('api/note', note)
    }

    deleteNote(id: number): Observable<{}>{
        const url = `api/note/${id}`
        return this.http.delete(url)
    }

    updateNote(note: Note): Observable<Note>{
        const url = `api/note/${note._id}`
        return this.http.put<Note>(url, note)
    }
}