import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  productData;
  get nativeWindow() : any {
    return _window();
 }
  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get('https://5ed162594e6d7200163a0830.mockapi.io/rvsp/products');
  }

}
