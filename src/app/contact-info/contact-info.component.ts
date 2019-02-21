import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../services/provider.service';

export interface ContactDetails {
  firstName?: string;
  phoneNumber?: number;
  lastName?: string;
}
@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  contactId: String;
  contactDetails: any = [];

  constructor(private providerService: ProviderService,
    private router: Router,
    public _route: ActivatedRoute,
    private toastr: ToastrService) {
      this.contactId = this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.getOneContact(this.contactId);
  }

  public getOneContact = (contactId): any => {

    this.providerService.getOneContact(contactId).subscribe(
      response => {
        if (response.status === 200) {
          console.log(response);
          this.contactDetails = response.data;
          console.log(this.contactDetails);
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
