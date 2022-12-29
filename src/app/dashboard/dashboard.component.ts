import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //deposit properties
  acno="";
  pswd="";
  amount="";
  acno1="";
  pswd1="";
  amount1="";
  
  //currentuser property
  user="";
  
  //current date and time
  sdate:any;
  constructor(private ds:DataService, private fb:FormBuilder, private router:Router) { 
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    }
    this.sdate=new Date();
  }
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })
  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })
  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('Please login First');
      this.router.navigateByUrl('');
    }

    
    // this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    // console.log(this.user);
    // this.user=JSON.parse(localStorage.getItem('currentAcno')||'');

  }
  deposit(){
    var acno= this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
if(this.depositForm.valid){
    this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message)
    },
      (result)=>{
        alert(result.error.message)
      }
    )
    // if(result)
    // {
    //   alert(`${amount} is credited...available balance is ${result}`)
    // }
  }


  }
  withdraw(){
    var acno= this.withdrawForm.value.acno1;
    var pswd=this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;

    // const result=this.ds.withdraw(acno,pswd,amount);
    if(this.withdrawForm.valid){
      this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)      
      },
        (result)=>{
          alert(result.error.message)
        }
      )
    }
    // alert('Clicked');
  }
//Removes the data stored and moves to the login page
  logout(){
    // alert('Logged out');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
  delete(){
    // alert('clicked');
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
  }
  onCancel(){
    this.acno="";
  }
  onDelete(event:any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      // this.router.navigateByUrl('')
      this.logout();
    },
    (result)=>{
      alert(result.error.message)
    })
  }

}
