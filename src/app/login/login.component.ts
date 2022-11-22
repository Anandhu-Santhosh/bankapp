import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//(3rd excecution)
// class - collecion of properties and functions
// properties/variables
aim="Your perfect banking partner";
account="Enter your account here";
acno='';
pswd='';
//database
userDetails:any={
  1000:{acno:1000,username:"Amal",password:1000,balance:1000},
  1001:{acno:1001,username:"Amal1",password:1001,balance:1000},
  1002:{acno:1002,username:"Amal2",password:1002,balance:1000},

}
// functions/methods - user defined functions (4th excecution)
  constructor() { // (1st execution)
    // It automatically invokes when the object is created
    // object initialization
  }

  ngOnInit(): void {//(2nd excecution)
    //It's a life cycle hooks of angular
    //when the component is created at same time, it will initialize or authorize
  }
  login(){
    // alert('Login clicked');
    var acno=this.acno;
    var pswd=this.pswd;
    var userDetails=this.userDetails;
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        alert('Login Successful');
      }
      else{
        alert('Invalid password');
      }
    }
    else{
      alert('Account not found');
    }
  }
  // login(a:any,p:any){
  //   // alert('Login clicked');
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       alert('Login Successful');
  //     }
  //     else{
  //       alert('Invalid password');
  //     }
  //   }
  //   else{
  //     alert('Account not found');
  //   }
  // }
  acnoChange(event:any){
    console.log(event);
    this.acno=event.target.value;//1000
    console.log(this.acno);
            
  }
  pswdChange(event:any){
    this.pswd=event.target.value;
    console.log(this.pswd);
    
  }

}
