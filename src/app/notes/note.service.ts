import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Note, MeasurementClass, Unit } from './note.model';

@Injectable()
export class NoteService {

  constructor() { }

  public getNotes(count?: number): Observable<MeasurementClass[]> {
    let notes = [];
    if (localStorage.getItem('notes') === null) {
      // this._initNotes();
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    notes = JSON.parse(localStorage.getItem('notes'));
    return Observable.of(notes).pipe(
      // map(data => data.filter((item) => item.id !== '')),
      catchError(this.handleError('getNotes'))
    ) as Observable<MeasurementClass[]>;
  }

  public addNote(note: MeasurementClass): Observable<boolean> {

    let notes = [];
    if (localStorage.getItem('notes') === null) {
      notes = [note];
      localStorage.setItem('notes', JSON.stringify(notes));
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    return Observable.of(true);
  }

  public deleteNote(note: MeasurementClass) {

    let notes: MeasurementClass[] = JSON.parse(localStorage.getItem('notes'));
    notes = notes.filter( x=> {
      // console.log(`${note == x}`);
      return x.id !== note.id;
    });

    localStorage.setItem('notes', JSON.stringify(notes));

  }


  private handleError = (operation: string = 'operation') =>
    (error: any) => {
      error.operation = operation;
      return throwError(error);
    };

  private _initNotes(){
      this._getMockNotes().forEach(x=>this.addNote(x));
      return this.getNotes();
  }

  public standardMeasureNames = (): Array<string> => [
    'Waist',
    'Bust',
    'Hips',
    'Shoulder',
    'Half Length',
    'Full Length',
    'Half waist',
    'Sleeve',
    'Round Sleeve'
  ];

  public standardUnits = (): Array<Unit> => [
    { id: 'in', name: 'Inches' },
    { id: 'cm', name: 'Centimeters' },
    { id: 'ft', name: 'Feets' },
  ];

  private _getMockNotes(){
    const measures = [
      { id: "axvdtt", name: "Lateefah Raheem", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
      { id: "axvdtt", name: "Lateefah Raheem", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
      { id: "axvdtt", name: "Lateefah Raheem", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
      { id: "axvdtt", name: "Lateefah Raheem", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
      { id: "shams", name: "Oyesola Ogundele", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}}
      ]},
      { id: "ascbhsdj", name: "Ajani Akeem", measures: [
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}}
      ]},
      { id: "axvdtt", name: "Eze Emanuel", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
      { id: "axvdtt", name: "Obiakor Chizaram", measures: [ 
        {name: 'height', value: 10, unit: { id: 'in', name: 'inches'}},
        {name: 'waist', value: 32, unit: { id: 'in', name: 'inches'}},
        {name: 'Half wast', value: 20, unit: { id: 'in', name: 'inches'}},
      ]},
    ];
    return measures;
  }
}
