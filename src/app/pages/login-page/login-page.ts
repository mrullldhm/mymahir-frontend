import { Component } from '@angular/core';
import { SharedModules } from '../../shared/shared.modules';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { Data } from '../../services/data';

@Component({
  selector: 'app-login-page',
  imports: [...SharedModules],
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  public loginForm: FormGroup;
  public hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private router: Router,
    private data: Data
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    try {
      const loginData: any = this.loginForm.value;
      const response: any = await this.apiService.httpPost('/auth/login', loginData);
      if (response.success) {
        console.log('Login successfully');
        let token = response.data.token;
        if (token) {
          this.data.setLocalStorage('token', token);
          console.log('Token submited');
        }
        this.router.navigateByUrl('/students');
      } else {
        console.error('Login unsuccessfully');
        alert('Invalid email or password');
      }
    } catch (err: any) {
      console.error(err.message);
      alert('Invalid email or password');
    }
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
