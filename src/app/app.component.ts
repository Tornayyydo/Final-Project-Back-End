import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private basketService: BasketService, private accountService: AccountService){}

  ngOnInit(): void {
    this.loadBasket()
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    this.accountService.loadCurrentUser(localStorage.getItem('token')).subscribe(user => {
      if (!user) {
          this.accountService.logout();
      }
      console.log('Loaded user:', user);
    });
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id')

    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket')
      }, error => {
        console.log(error)
      })
    }
  }
}
