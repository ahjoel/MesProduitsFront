import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';
import { apiURL } from '../config';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  produits: Produit[];
  apiurl = apiURL;
  constructor(
    private produitService: ProduitService,
    private router: Router,
    public authService: AuthService
  ) {
    // this.produits = this.produitService.listeProduit();
  }

  ngOnInit(): void {
    this.chargerProduits();
  }

  supprimerProduit(p: Produit) {
    let conf = confirm(
      'Etes-vous sûr de vouloire supprimer ' +
        p.nomProduit +
        ' ? \nCette action est irréversible.'
    );
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log('produit supprimé');
        this.chargerProduits();
        this.router.navigate(['produits']);
      });
  }

  chargerProduits() {
    this.produitService.listeProduit().subscribe((prods) => {
      // console.log(prods);
      this.produits = prods;
      console.log(this.produits);

      this.produits.forEach((prod) => {
        this.produitService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });
  }

  // chargerProduits() {
  //   this.produitService.listeProduit().subscribe((prods) => {
  //     this.produits = prods;
  //   });
  // }
}
