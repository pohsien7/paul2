import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.setPhoneValidation();
  }
  registerForm: FormGroup = this.formBuilder.group({
    fullName: [, { validators: [Validators.required], updateOn: "change" }],
    email: [, {
      validators: [Validators.required, Validators.email],
      updateOn: "change",
    }],
    password: [, { validators: [Validators.required], updateOn: "change" }],
    phone: [, { updateOn: "change" }],
    role: ['jobSeeker', { validators: [Validators.required], updateOn: 'change' }],
  });



  setPhoneValidation() {
    const phoneControl = this.registerForm.get("phone")!;
    phoneControl.setValidators([Validators.pattern("^[0-9]*$"),
    Validators.required,]);
    this.registerForm.get("role")!.valueChanges.subscribe((role) => {
      if (role == "jobSeeker") {
        phoneControl.setValidators([Validators.pattern("^[0-9]*$"),
        Validators.required,]);
      } else if (role == "employee") {
        phoneControl.setValidators([Validators.pattern("^[0-9]*$")]);
      }
      phoneControl.updateValueAndValidity();
    });
  }
}



