import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  @Input()
  categorie!: Categorie;

  constructor(){}

  ngOnInit(){
    console.log("ngOnInit du composant UpdatedCategorie", this.categorie);
  }

  saveCategorie(){

  }
}
