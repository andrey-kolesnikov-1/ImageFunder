import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  // title = 'Image Finder';

  user: boolean = false;
  isAuthWindow: boolean = false;
  isRegistrWindow: boolean = false;
  errorPassword: boolean = false;
  errorSingIn: boolean = false;
  formRegistr!: FormGroup;
  formSingIn!: FormGroup;
  downtime: number = 60;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit(): void {
    this.formRegistr = new FormGroup({
      login: new FormControl('', Validators.required),
      password_1: new FormControl('', Validators.required),
      password_2: new FormControl('', Validators.required),
    });
    this.formSingIn = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    setTimeout(() => {
      if (localStorage.getItem('user') !== null) {
        this.isAuthWindow = this.user = true;
      } else {
        this.isRegistrWindow = true;
      }
    }, 800);
  }

  @HostListener('window:focus')
  doSomething(): void {
    if (!this.isRegistrWindow && !this.isAuthWindow) {
      fromEvent(window, 'mousemove')
        .pipe(debounceTime(this.downtime * 1000), takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.isAuthWindow = true;
          this.unsubscribe$.next();
        });
    }
  }

  @HostListener('window:blur')
  doSomethingto(): void {
    this.unsubscribe$.next();
  }

  toSingIn(): void {
    let user: any = JSON.parse(localStorage.getItem('user') || '');
    if (user !== null) {
      if (
        this.formSingIn.value.login === user.login &&
        this.formSingIn.value.password === user.password_1
      ) {
        this.isAuthWindow = false;
        this.formSingIn.reset();
        this.doSomething();
      } else {
        this.errorSingIn = true;
      }
    }
  }

  toRegist(): void {
    if (
      this.formRegistr.value.password_1 === this.formRegistr.value.password_2
    ) {
      localStorage.setItem('user', JSON.stringify(this.formRegistr.value));
      this.isRegistrWindow = false;
      this.formRegistr.reset();
      this.doSomething();
    } else {
      this.errorPassword = true;
    }
  }

  toggleToRegistration(): void {
    this.isAuthWindow = false;
    setTimeout(() => {
      this.isRegistrWindow = true;
    }, 250);
  }

  toggleToSingIn(): void {
    this.isRegistrWindow = false;
    setTimeout(() => {
      this.isAuthWindow = true;
    }, 250);
  }

  GoOut(): void {
    localStorage.removeItem('user');
    this.isRegistrWindow = true;
    this.user = false;
    this.unsubscribe$.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
