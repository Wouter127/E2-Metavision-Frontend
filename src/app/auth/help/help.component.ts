import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  kernwoord: string = "";

  bezoeker_vragen : {id: number, vraag: string, antwoord: string, auth: string}[] = [];
 

  Search() {
      if(this.kernwoord != ""){
        this.bezoeker_vragen = this.bezoeker_vragen.filter(res =>{
        return res.vraag.toLocaleLowerCase().match(this.kernwoord.toLocaleLowerCase())
    })
      }else if(this.kernwoord == "") {
        this.ngOnInit();
      }
      
  }
  constructor() { }

  ngOnInit(): void {
    this.bezoeker_vragen = [ 
      {"id":0, "vraag": "Wat is wijnbouwer.be?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":1, "vraag": "Hoe start ik?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":2, "vraag": "Hoe kom ik aan zo\'n futuristisch weerstation?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":3, "vraag": "Wat zijn publieke weerstations?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":4, "vraag": "Ik zie geen data verschijnen?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":5, "vraag": "Ik ben uitgenodigd, hoe accepteer ik dit?", "antwoord": "antwoord", "auth": "bezoeker"},
      {"id":6, "vraag": "help, ik kan niet alles wat ik zou moeten kunnen!", "antwoord": "antwoord", "auth": "gebruiker"},
      {"id":7, "vraag": "Hoe ontvang ik alarmen?", "antwoord": "antwoord", "auth": "gebruiker"},
      {"id":8, "vraag": "Hoe word ik beheerder van een organisatie", "antwoord": "antwoord", "auth": "gebruiker"},
      {"id":9, "vraag": "Hoe voeg ik iemand toe aan mijn organisatie?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":10, "vraag": "Hoe verwijder ik een organsatiebeheerder?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":11, "vraag": "Wat als ik een gebruiker verwijder?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":12, "vraag": "Wat als ik een gebruiker verwijder", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":13, "vraag": "Hoe maak ik een weerstation publiek?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":14, "vraag": "Wat zijn alarmwaarden?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":15, "vraag": "Wat zijn schakelwaarden?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":16, "vraag": "Hoe activeer ik een weerstation?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":17, "vraag": "Ik ben mijn unieke code kwijt, wat nu?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":18, "vraag": "Wat is schakelen?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":19, "vraag": "Hoe schakel ik handmatig?", "antwoord": "antwoord", "auth": "organisatiebeheerder"},
      {"id":20, "vraag": "Hoe voeg ik een organisatie toe?", "antwoord": "antwoord", "auth": "admin"},
      {"id":21, "vraag": "Hoe voeg ik een organisatiebeheerder toe?", "antwoord": "antwoord", "auth": "admin"},
  
    ];
  }
  
}
