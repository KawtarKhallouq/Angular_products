import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent implements OnInit{

  public productForm!: FormGroup;

  constructor(private fb:FormBuilder, private productService:ProductService) {
    
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe(
      {
        next: data => {
          alert(JSON.stringify(data));
        },
        error: error => {
          console.log(error);
        }
      }
    )
}
}
