import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { EmployeeProfileService } from '../employee/services/employee-profile.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public profileExists: boolean;
  public get userId(): string {
    return this.employeeProfile.userId;
  }

  constructor(private authorize: AuthorizeService, 
    private employeeProfile: EmployeeProfileService, 
    private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authorize.isAuthenticated();
    this.profileExists = this.employeeProfile.profile === null;
  }

  public redirectToProfileCreate(): void {
    this.router.navigate(['/employee/create']);
  }

  public redirectToProfileDetails(): void {
    this.router.navigate([`/employee/details/${this.employeeProfile.userId}`]);
  }

}
