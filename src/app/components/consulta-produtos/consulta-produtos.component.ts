import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit {

  // Atributos
  produtos: any[] = [];
  paginador: number = 1;
  produto: any = {};
  mensagem: string = '';

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

  // Função para avançar e voltar na régua de paginação
  pageChange(event: any): void {
    this.paginador = event;
  }

  // Função para capturar os dados do produto que será exibido na janela modal
  onSelect(value: any): void {
    this.produto = value;
  }

  // Função para realizar a exclusão do produto
  onDelete(): void {
    this.httpClient.delete(`http://localhost:8081/api/produtos/${this.produto.id}`)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Produto '${data.nome}' excluído com sucesso.`
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

  
}
