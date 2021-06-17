import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  textForm!: FormGroup;
  apiKey: string = "4d8fb5b93d4af21d66a2948710284366";
  url: string = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.textForm = this.formBuilder.group({
      cidade: ['cidade', Validators.required]
    })
    console.log(this.textForm)
    this.getClima()
  }

  onSubmit() {
    console.log(this.textForm)
  }

  getClima() {
    let params = new HttpParams({
      fromObject: {
        q: 'sao paulo',
        appid: this.apiKey
      }
    });

    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather', { params })
      .toPromise()
      .then( response => {

        console.log(response)

        }
      )
  }
}
