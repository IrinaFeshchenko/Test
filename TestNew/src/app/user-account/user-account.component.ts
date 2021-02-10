import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,FormsModule } from '@angular/forms';
import { UserService } from "../shared/user.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styles: [
  ]
})
export class UserAccountComponent implements OnInit {

  fg?:FormGroup;
  userAccountForms: FormArray = this.fb.array([]);
  results:any;


  closeResult = '';

  constructor(private fb: FormBuilder, public userService:UserService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.userService.getBankAccountList().subscribe(
      res => {
        if (res == [])
          this.addUserAccountForms();
        else {
          //generate formarray as per the data received from BankAccont table
          (res as []).forEach((userAccount: any) => {
            this.userAccountForms.push(this.fb.group({
              id: [userAccount.id],
              name: [userAccount.name],
              active: [userAccount.active]
            }));
          });
        }
      }
    );

    this.userService.getActive().subscribe(
      result => {
        if (result == [])
          console.log('true');
        else {
          this.userService.getActive().subscribe((data:any)=>
          {
            this.results = data;
            this.results=Array.of(this.results);
            console.log(result)
          });
        }
      }
    );
    
  }


  open(content: any) { 
    this.modalService.open(content, 
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { 
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 

  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  }


  addUserAccountForms() {
    this.userAccountForms.push(this.fb.group({
      id: [0],
      name: [''],
      active: ['']
    }));
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.id == 0)
      this.userService.postBankAccount(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ id: res.id });
          console.log("add");
        });
    else
      this.userService.putBankAccount(fg.value).subscribe(
        (res: any) => {
          console.log("update");
        });
  }
  fileChangeEvent(fg: FormGroup) {
    if (fg.value.id == 0)
      this.userService.postBankAccount(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ id: res.id });
          console.log("add");
        });
    else
      this.userService.putBankAccount(fg.value).subscribe(
        (res: any) => {
          console.log("update");
        });
 };
  onDelete(id:number, i:number) {
    if (id == 0)
      this.userAccountForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.userService.deleteBankAccount(id).subscribe(
        res => {
          this.userAccountForms.removeAt(i);
        });
  }

}
