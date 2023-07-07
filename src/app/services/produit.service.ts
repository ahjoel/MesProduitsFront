import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
// Design pattern utilisé pour les designs pattern
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from 'src/app/config';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { Image } from '../model/image.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits: Produit[]; //un tableau de produits
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Retourne un tableau de produit
  listeProduit(): Observable<Produit[]> {
    // let jwt = this.authService.getToken();
    // jwt = 'Bearer ' + jwt;
    // let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Produit[]>(apiURL + '/all');
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(apiURL + '/addprod', prod);
  }

  supprimerProduit(id: number) {
    const url = `${apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/getbyid/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(apiURL + '/updateprod', prod);
  }

  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(apiURLCat, cat, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
}
