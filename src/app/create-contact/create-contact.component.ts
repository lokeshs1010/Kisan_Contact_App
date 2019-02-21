import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  firstName: String;
  lastName: String;
  phoneNumber: String;

  constructor(private providerService: ProviderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  public createContact = (): any => {

    const data = {
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phoneNumber': this.phoneNumber
    };

    this.providerService.createContact(data).subscribe(
      response => {
        if (response.status === 200) {
          console.log(response);
          this.toastr.success('Contacts Created', 'Message');
          setTimeout(() => {
            this.router.navigate(['/contact-list']);
          }, 1500);
          } else {
          this.toastr.warning(response.message, 'Message');
        }
      },
      error => {
        console.error('Some Error occurred', error);
        this.toastr.warning('Some Error occurred', 'Message');
      }
    );
  }

}
