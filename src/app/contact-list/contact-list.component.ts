import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../services/provider.service';

export interface PeriodicElement {
  firstName: string;
  position: number;
  lastName: string;
  id: string;
}


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'action'];
  dataSource: any[];
  constructor(private providerService: ProviderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts = (): any => {

    this.providerService.getAllContacts().subscribe(
      response => {
        if (response.status === 200) {
          console.log(response);
          let inc = 0;
          const arr = [];
          for (const x of response.data) {
            const obj = {
              position: ++inc,
              firstName: x.firstName,
              lastName: x.lastName,
              id: x._id
            };
            arr.push(obj);
            }
            console.log(arr);
            this.dataSource = arr;
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
