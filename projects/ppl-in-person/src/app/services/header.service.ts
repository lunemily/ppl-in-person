import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  url: string = "asdf";

  constructor() { }

  setUrl(url: string): void {
    this.url = url;
  }
}
