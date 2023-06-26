import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  @Input()
  categorie!: Categorie;

  @Input()
  modeFormulaire!:boolean;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();


  constructor(){}

  ngOnInit(){
    console.log("ngOnInit du composant UpdatedCategorie", this.categorie);
  }

  saveCategorie(){
    // Envoie de data @Output vers ListeCategorie
    this.categorieUpdated.emit(this.categorie);
  }
}
