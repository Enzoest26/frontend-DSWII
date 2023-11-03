import { Component } from '@angular/core';
import {faHeadset, faTruckFast, faWallet, faGift} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  headPhoneIcon = faHeadset;
  truckFastIcon = faTruckFast;
  walletIcon = faWallet;
  giftIcon = faGift
}
