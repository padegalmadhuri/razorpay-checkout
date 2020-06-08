import { Component, OnInit,NgZone  } from '@angular/core';
import { ProductDataService } from '../services/product-data.service';
import {ICustomWindow,WindowRefService} from '../services/window-ref.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productData;
    private _window: ICustomWindow;
    public rzp: any;
    public options: any = {
     key: 'rzp_test_0BxZH2evuhFSuY',
     name: 'RazorPay Demo',
     description: 'Shopping',
     amount: 100,
     prefill: {
       name: 'Padegal Madhuri',
       email: 'padegalmadhuri@gmail.com',
     },
     notes: {},
     theme: {
       color: '#3880FF'
     },
     handler: this.paymentHandler.bind(this),
     modal: {
       ondismiss: (() => {
         this.zone.run(() => {
           //alert("Payment Failled....Retry after some time");

           this.toastr.error('Payment Failed');

           this.router.navigate(["/"])
           // add current page routing if payment fails
         })
       })
     }
   };

   constructor(private productService: ProductDataService, private zone: NgZone,
     private winRef: WindowRefService,private router:Router,private toastr:ToastrService) {
     this.productService.getData().subscribe((data) => {
       this.productData = data;
       // console.log(this.productData);
     });
     this._window = this.winRef.nativeWindow;
   }

   initPay(price,id): void {
     // this.winRef.getOrderId(parseFloat(price)*100,id).subscribe((data)=>{
     //   console.log(data);
     // },(err)=>console.log(err))
       this.options.amount=parseFloat(price)*100;
     this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
     this.rzp.open();

   }
   paymentHandler(res: any) {
     this.zone.run(() => {
       // add API call here
       console.log(res);
       this.toastr.error('Payment Success');
       this.router.navigate(["/payment-successfull"])
       // let generated_signature = CryptoJS.HmacSHA256(res.razorpay_order_id + "|" + res.razorpay_payment_id,"V3iI59d2EyyBpKAxThdGHLTT");
       // if (generated_signature == res.razorpay_signature) {
       //   console.log("payment is successful");
       //   this.router.navigate(["/payment-successfull"])
       // }
       // else{
       //   console.log(generated_signature,res.razorpay_signature)
       //   alert("there is some error!Please try again")
       // }
     });
   }

  ngOnInit(): void {
  }

}
