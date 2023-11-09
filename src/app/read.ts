import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './Question';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  constructor(private http: HttpClient) {}

  getJsonData(): Observable<Question[]> {
    return this.http.get<Question[]>('assets/quiz-new-2.json');
  }
}
