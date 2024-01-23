import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToConvertBase64Service implements OnInit {

  private reader= new FileReader();
  private textConverted: string = "";

  constructor() { }

  ngOnInit(): void {

  }

  public toConvertBase64(file:File):Promise<string>{
    return new Promise((resolve, reject) => {
      this.reader.onload = (reader) => {
        this.textConverted = (reader.target as FileReader).result as string;
        console.log(this.textConverted);
        resolve(this.textConverted);
      }
      this.reader.onerror = reject;
      this.reader.readAsDataURL(file);
    });
  }
}
