import { Coracao } from './../shared/coracao.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  // public coracaoVazio: string ="/assets/coracao_vazio.png";
  // public coracaoCheio: string ="/assets/coracao_cheio.png";

  @Input() public tentativas: number;
  //Qtd de corações/tentativas erradas
  public coracoes: Coracao[] = [
    new Coracao(true), new Coracao(true), new Coracao(true)
  ]

  constructor() {
    console.log(this.coracoes);

  }

  ngOnChanges(): void {
    let indice = this.coracoes.length - this.tentativas -1;
    if(this.tentativas !== this.coracoes.length){
      this.coracoes[indice].cheio == false;
    }
    console.log("Tentativas recebinas no painel: ",this.tentativas);

  }

  ngOnInit() {

  }


}
