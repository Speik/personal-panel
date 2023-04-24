import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { UsersService } from './users.service';
import { IUser } from './users.model';

type EditForm = {
  id: Nullable<string>;
  form: FormGroup;
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  public isLoading = false;
  public isCreationVisible = false;
  public usersData: IUser[] = [...new Array(6)];

  public userCreationForm = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public userEdit: EditForm = {
    id: null,
    form: this.fb.group({
      name: ['', [Validators.required]],
      password: '',
    }),
  };

  public constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public toggleCreationForm(): void {
    this.isCreationVisible = !this.isCreationVisible;
  }

  public confirmDelete(event: Event, user: IUser): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete user ${user.name}?`,
      target: event.target!,
      accept: this.deleteUser.bind(this, user),
    });
  }

  public handleCreateUser(): void {
    if (!this.userCreationForm.valid) {
      return;
    }

    const [name, password] = [
      this.userCreationForm.controls.name.value ?? '',
      this.userCreationForm.controls.password.value ?? '',
    ];

    this.userCreationForm.reset();
    this.isCreationVisible = false;

    this.usersService.createUser({ name, password }).subscribe(() => {
      this.getUsers();
    });
  }

  public showEditUser(user: IUser): void {
    if (!user) return;

    this.userEdit.id = user.id!;
    this.userEdit.form.controls?.['name'].setValue(user.name);
  }

  public hideEditForm(): void {
    this.userEdit.id = null;
    this.userEdit.form.reset();
  }

  public handleEditUser(): void {
    if (!this.userEdit.form.valid) {
      return;
    }

    const [id, name, password] = [
      this.userEdit.id ?? '',
      this.userEdit.form.controls?.['name'].value ?? '',
      this.userEdit.form.controls?.['password'].value ?? '',
    ];

    this.hideEditForm();

    this.usersService.updateUser(id, { name, password }).subscribe(() => {
      this.getUsers();
    });
  }

  private deleteUser(user: IUser): void {
    this.usersService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  private getUsers(): void {
    this.isLoading = true;

    this.usersService.getUsers().subscribe((users) => {
      this.usersData = users;
      this.isLoading = false;
    });
  }
}
