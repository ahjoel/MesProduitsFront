import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css'],
})
export class RechercheParNomComponent implements OnInit {
  nomProduit!: string;
  produits!: Produit[];
  allProduit!: Produit[];
  searchTerm!: string;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.listeProduit().subscribe((prods) => {
      // this.allProduit = prods; (a utiliser dans le cas de keyup)
      this.produits = prods;
    });
  }

  rechercherProds() {
    this.produitService.rechercherParNom(this.nomProduit).subscribe((prods) => {
      this.produits = prods;
    });
  }

  onKeyUp(filterText: string) {
    this.produits = this.allProduit.filter((item) =>
      item.nomProduit.toLowerCase().includes(filterText)
    );
  }
}
