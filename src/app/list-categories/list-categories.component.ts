import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
})
export class ListCategoriesComponent implements OnInit {
  categories!: Categorie[];
  updatedCat: Categorie = { idCat: 0, nomCat: '' };
  ajout:boolean=true;
  constructor(private produitService: ProduitService) {}
  ngOnInit(): void {
    this.chargerCategories();
  }
  categorieUpdated(cat: Categorie) {
    console.log('Objet Categorie reçu du composant updatedCategorie' + cat);
    this.produitService
      .ajouterCategorie(cat)
      .subscribe(() => this.chargerCategories());
  }

  chargerCategories() {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      // console.log(cats);
    });
  }

  updateCat(cat: Categorie){
    this.updatedCat = cat;
    this.ajout=false;
  }
}
