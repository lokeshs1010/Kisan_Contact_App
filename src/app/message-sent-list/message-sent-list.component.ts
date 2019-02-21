import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProviderService } from '../services/provider.service';

export interface PeriodicElement {
  name: string;
  position: number;
  time: number;
  otp: string;
}

@Component({
  selector: 'app-message-sent-list',
  templateUrl: './message-sent-list.component.html',
  styleUrls: ['./message-sent-list.component.css']
})
export class MessageSentListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'time', 'otp'];
  dataSource: any[];
  constructor(private providerService: ProviderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getMessageDetails();
  }

  public getMessageDetails = (): any => {

    this.providerService.getMessageDetails().subscribe(
      response => {
        if (response.status === 200) {
          console.log(response);
          let inc = 0;
          const arr = [];
          for (const x of response.data) {
            const obj = {
              position: ++inc,
              name: `${x.userId.firstName} ${x.userId.lastName}`,
              time: x.createdDate,
              otp: x.otp
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
