import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService:ProductService,
              private router : Router,
              public appState : AppStateService) {
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.appState.setProductState({
        products: products,
        status: "LOADED"
      });
    }, error => {
      console.error('Failed to load products', error);
      this.appState.setProductState({
        status: "ERROR",
        errorMessage: error.message || 'Unknown error'
      });
    });
  }

  searchProducts(){
    /*
    this.appState.setProductState({
      status :"LOADING"
    });*/
    this.productService.searchProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productsState.totalProducts=totalProducts;
          let totalPages=
            Math.floor(totalProducts / this.appState.productsState.pageSize);
          if(totalProducts % this.appState.productsState.pageSize !=0 ){
            ++totalPages;
          }
          this.appState.setProductState({
            products :products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status :"LOADED"
          })
        },
        error : err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage :err
          })
        }
      })

    //this.products=this.productService.getProducts();
  }


  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        this.getAllProducts();
        //this.appState.productsState.products=
          //this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
        //this.searchProducts();
      }
    })
  }
  handleGotoPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}