import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // Atributos
  produtos : any[] = [];
  
  // Declarando um objeto HttpCliente
  constructor(
    private httpClient : HttpClient
  ){}

  ngOnInit(): void {
    
    // Fazendo uma requisição para o serviço de consulta de produtos
    this.httpClient.get('http://localhost:8081/api/produtos')
      .subscribe({ // Aguardando a resposta
        next: (data) => {
          // Armazenando os dados dos produtos obtidos da API
          this.produtos = data as any[];
        },
        error: (e) => { // Capturando o retorno de erro da API
          console.log(e.error);
        }
      })
  }


}
