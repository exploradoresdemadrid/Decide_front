import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/auth.service';
import { OverlaysService } from 'src/shared/overlays';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup = this.fb.group({
    code : ['', Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private overlay: OverlaysService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  sendCode(){
    if(this.loginForm.invalid){
      return
    }
    this.router.navigate(['/home']);
    //this.overlay.requestWithLoaderAndError(()=> this.authService.login(this.loginForm.value)).pipe(()=> this.router.navigate[('/home')])
  }

}
