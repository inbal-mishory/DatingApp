import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;
  userRoles: any[];

  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit() {
    this.userRoles = this.authService.decodedToken.role as Array<string>;
    console.log(this.userRoles);
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  approvePhoto(photoId) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.Id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectPhoto(photoId) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.Id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

}
