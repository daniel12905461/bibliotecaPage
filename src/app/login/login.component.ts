import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertSwallService } from '../service/alert-swall.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public alertSwal: AlertSwallService
  ) { 
    if (this.authService.userValue) { 
        this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.createForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      // email: ['', Validators.required],
      user: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      password: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(loginForm:any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(loginForm)
    .pipe(first())
    .subscribe(
      data => {
        this.alertSwal.showSwallSuccess(data);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.alertSwal.showSwallError(error.error);
        this.createForm();
          // this.error = error;
          // this.loading = false;
      });
  }
}
