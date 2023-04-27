import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/service/user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  
  public userId: any = 0; 
  public user!: User
  public matcher = new MyErrorStateMatcher()



  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public userForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required], 
    address: ['', Validators.required]
  })

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? 0;
      console.log(this.userId)

      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(user => {
          this.user = user
      
          this.userForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            phone: [this.user.phone, Validators.required],
            address: [this.user.address, Validators.required]
          })
        })
      }
    })
  }

  onSubmit() {
    this.userService.createUser({...this.userForm.value, id: this.userId}).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}