import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams: ShopParams;
  totalCount: number = 20;

  searchTerm: string = ""

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService, private route: ActivatedRoute) {
    this.shopParams = shopService.getShopParams()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const oldBrandId = this.shopParams.brandId;
    const oldTypeId = this.shopParams.typeId;
    
    this.shopParams.brandId = params['brandId'] ? +params['brandId'] : 0;
    this.shopParams.typeId = params['typeId'] ? +params['typeId'] : 0;
    
    if (oldBrandId !== this.shopParams.brandId || oldTypeId !== this.shopParams.typeId) {
      this.shopParams.pageNumber = 1;
      
      this.getProducts(false);
    } else {
      this.getProducts(true);
    }
    
    this.shopService.setShopParams(this.shopParams);
    });
    
    this.getBrands();
    this.getTypes();
  }
  

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        if (response) {
          this.products = response.data;
          this.totalCount = response.count;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams()
    params.brandId = brandId;
    params.pageNumber = 1
    this.shopService.setShopParams(params)
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams()
    params.typeId = typeId;
    params.pageNumber = 1
    this.shopService.setShopParams(params)
    this.getProducts();
  }

  onSortSelected(event: Event) {
    const params = this.shopService.getShopParams()
    const sort = (event.target as HTMLSelectElement).value;
    params.sort = sort;
    this.shopService.setShopParams(params)
    this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams()
    if(params.pageNumber !== event){
      params.pageNumber = event
      this.shopService.setShopParams(params)
      this.getProducts(true)
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams()
    params.search = this.searchTerm
    params.pageNumber = 1
    this.shopService.setShopParams(params)
    this.getProducts()
  }

  onReset(){
    this.searchTerm = ""
    this.shopParams = new ShopParams()
    this.shopService.setShopParams(this.shopParams)
    this.getProducts()
  }
}
