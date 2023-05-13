import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Container } from '../app/model/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
   
  url: string = 'assets/data.json';

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<Container> {
    return this.http.get<Container>(this.url);
  }
}
