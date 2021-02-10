import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Active } from './active.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }

  formData:Active = new Active();
  list?:Active[];

  postBankAccount(formData: any) {
    return this.http.post(environment.apiBaseURI + '/Users', formData);
  }

  putBankAccount(formData: { id: number;name:string;active:boolean }) {
    return this.http.put(environment.apiBaseURI + '/Users/' + formData.id, formData);
  }

  deleteBankAccount(id: number) {
    return this.http.delete(environment.apiBaseURI + '/Users/' + id);
  }

  getBankAccountList() {
    return this.http.get(environment.apiBaseURI + '/Users');
  }

  getInfo(){
    this.http.get(environment.apiBaseURI + '/Users/findall')
    .toPromise()
    .then(res=> this.list = res as Active[]);
  }
  getActive(){
    return this.http.get(environment.apiBaseURI + '/Users/findall');
  }
}
