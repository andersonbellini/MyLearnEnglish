import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase-model';
import { FRASES } from './frases.mock';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string ='';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarApp: EventEmitter<String> = new EventEmitter()

  constructor() {
    this.atualizaRodada();

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log("Painel foi destruído.");
  }

  public atualizarResposta(resposta: Event): void
  {
    this.resposta = (<HTMLInputElement>resposta.target).value;
    //console.log(this.resposta);
  }

  public verificarResposta(): void {
    console.log("Tentativas Ini: ",this.tentativas);
    if(this.rodadaFrase.frasePtBr == this.resposta){
      //alert('A tradução está correta!');

      //Troca pergunta da rodada
      this.rodada++;
      console.log("Rodada: ", this.rodada);
      console.log('Verificar resposta: ', this.resposta);

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length);
      console.log("progresso: ", this.progresso);

      //
      if(this.rodada===4){
        this.encerrarApp.emit('Congrats');
        //alert("Concluído as traduções com sucesso!");

      }

      //Atualiza o objeto rodadaFrase
      this.atualizaRodada();

      // if(this.rodadaFrase!=undefined) {
      //   console.log(this.rodadaFrase);
      // } else {
      //   alert("Final");
      // }
    }
    else
    {
      //alert('A tradução está errada!');
      //Decrementa a variavel tantativas
      this.tentativas--;

      if(this.tentativas === -1){
        //alert('Você perderu todas as tentativas!! :(')
        this.encerrarApp.emit('Game Over');
      }

    }
    console.log("Tentativas após: ",this.tentativas);
  }

 public atualizaRodada(): void{
   //Define a frase da rodada com base em alguma lógica
  this.rodadaFrase = this.frases[this.rodada];
  //console.log(this.frases);

  //Limpar resposta
  this.resposta = '';
 }

}
