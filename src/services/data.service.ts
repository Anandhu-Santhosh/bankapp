import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global http header object
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser="";

  currentAcno="";


  constructor(private http:HttpClient) {
    // this.getDetails

   }
  //database
//save details to store data to the local storage
  saveDetails(){
    // if(this.userDetails){
    //   localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
    // }
    // if(this.currentUser){
    //   localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    // }
    // if(this.currentAcno){
    //   localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    // }
    //DATABASE
    localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
    //currentUser
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    //currentAcno
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
  // getDetails(){
  //   if(localStorage.getItem('Database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('Database') || '');
  //   }
  //   if(localStorage.getItem('currentUser')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentUser') || '');
  //   }
  //   if(localStorage.getItem('currentAcno')){
  //     this.userDetails=JSON.parse(localStorage.getItem('currentAcno') || '');
  //   }
  // }
userDetails:any={
  1000:{acno:1000,username:"Amal",password:1000,balance:1000,transaction:[]},
  1001:{acno:1001,username:"Amal1",password:1001,balance:1000,transaction:[]},
  1002:{acno:1002,username:"Amal2",password:1002,balance:1000,transaction:[]},

}

register(acno:any,username:any,password:any){

const data={
  acno,
  password,
  username
}

 return this.http.post('http://localhost:3000/register',data)

  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   return false;
  // }
  // else{
  //   userDetails[acno]={
  //     acno,
  //     username,
  //     password,
  //     balance:0,
  //     transaction:[]
  //   }
  //   this.saveDetails();
  //   console.log(userDetails);
  //   return true;
    
  // }
}

login(acno:any,pswd:any){

  const data={
    acno,
    pswd
  }
  
  return this.http.post('http://localhost:3000/login',data)
  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     this.currentUser=userDetails[acno]['username'];  
  //     this.currentAcno=acno;   
  //     this.saveDetails();

  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  // else{
  //   return false;
  // }
}

getToken(){
  //fetch token from localstorage
  const token=JSON.parse(localStorage.getItem('token')||'');
  //apend token inside the header
  let headers= new HttpHeaders()
  if(token){
    options.headers=headers.append('x-access-token',token)
  }
  return options//to get token
  
}
deposit(acno:any,pswd:any,amt:any){

  const data={
    acno,
    pswd,
    amount:amt
  }
  
  return this.http.post('http://localhost:3000/deposit',data,this.getToken())


  // var amount=parseInt(amt);
  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     userDetails[acno]['balance']+=amount;
  //     userDetails[acno]['transaction'].push({
  //       Type:'Credit',
  //       Amount:amount
  //     })
  //     console.log(userDetails);
  //     this.saveDetails();

  //     return userDetails[acno]['balance']
  //   }
  //   else{
  //     alert('Password incorrect');
  //     return false;
  //   }
  // }
  // else{
  //   alert('User not found');
  //   return false;
  // }
}

withdraw(acno:any,pswd:any,amt:any){
  const data={
    acno,
    pswd,
    amount:amt
  }
  
  return this.http.post('http://localhost:3000/withdraw',data,this.getToken())


  // var amount=parseInt(amt);
  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     if(amount<userDetails[acno]['balance']){      
  //     userDetails[acno]['balance']-=amount;
  //     userDetails[acno]['transaction'].push({
  //       Type:'Debit',
  //       Amount:amount
  //     })
  //     console.log(userDetails);
  //     this.saveDetails();

  //     return userDetails[acno]['balance'];
  //   }
  //   else{
  //     alert('Inssuficient balance');
  //     return false;
  //   }
  //   }
  //   else{
  //     alert('Password incorrect');
  //     return false;
  //   }
  // }
  // else{
  //   alert('User not found');
  //   return false;
  // }
}

getTransaction(acno:any){
  const data={
    acno
  }
  
  return this.http.post('http://localhost:3000/transaction',data,this.getToken())
}

deleteAcc(acno:any){

  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  
}
}
