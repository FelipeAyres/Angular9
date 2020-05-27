import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' //Singleton
})
export class ProductService {

  private baseURL = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product).pipe(
      map((obj) => obj),
      catchError(e => this.erroHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL);
  }

  readById(id: number): Observable<Product> {
    const URL = `${this.baseURL}/${id}`;
    return this.http.get<Product>(URL);
  }

  update(product: Product): Observable<Product> {
    const URL = `${this.baseURL}/${product.id}`;
    return this.http.put<Product>(URL, product);
  }

  delete(id: number): Observable<Product> {
    const URL = `${this.baseURL}/${id}`;
    return this.http.delete<Product>(URL);
  }

  erroHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

}
