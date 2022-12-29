import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  acno="";
  pswd="";
  uname="";


  constructor(private ds:DataService, private router:Router, private fb:FormBuilder) { }

  //registration model
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //control pass from ts to html file
  

  ngOnInit(): void {
  }
  register(){
    // console.log(this.registerForm);
    // console.log(this.registerForm.get('uname')?.errors);
    
    // alert('register clicked');
    var uname = this.registerForm.value.uname;
    var acno = this.registerForm.value.acno;
    var pswd = this.registerForm.value.pswd;

    if(this.registerForm.valid){

    this.ds.register(acno,uname,pswd)
    .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
    })
  //   if(result){
  //     alert('register successful');
  //     this.router.navigateByUrl('')
  //   }
  //   else{
  //     alert('User already registered');
  //     this.router.navigateByUrl('register')
  //   }
  // }
 
  }
   else{
    alert('Invalid Form')  
  }
 }
}
