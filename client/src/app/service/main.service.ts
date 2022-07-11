import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiEndPoint = environment.apiEndPoint || "http://localhost:3000";
  isProd = environment.production || false;

  constructor() { 
    console.log("API @ " + this.apiEndPoint + " is being used.");
  }
  
}
