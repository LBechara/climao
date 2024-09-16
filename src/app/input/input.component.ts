import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
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
  nomeCidade: string = "";
  temperaturaMinima: any;
  temperaturaMaxima: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    criaFormulario()
  }

  criaFormulario() {
    this.textForm = this.formBuilder.group({
      cidade: ['', Validators.required]
    })
    console.log(this.textForm)
  }
  
  onSubmit() {
    console.log(this.textForm.value.cidade)
    this.mostraRetorno(this.textForm.value.cidade)
  }
  
  getClimao(cidadeProcurada: string) { 
    return ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cidadeProcurada}&appid=${this.apiKey}&units=metric`,
      method: 'GET',
    })
  }
    
  mostraRetorno(cidade: string) {
    this.getClimao(cidade).subscribe(el => {
      console.log(el.response)
      this.nomeCidade = el.response.name
      this.temperaturaMinima = el.response.main.temp_min
      this.temperaturaMaxima = el.response.main.temp_max
    })
  }
}
