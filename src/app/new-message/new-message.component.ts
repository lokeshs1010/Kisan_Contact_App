import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  message: String;
  otp: Number;
  contactId: String;

  constructor(private providerService: ProviderService,
    private router: Router,
    private toastr: ToastrService,
    public _route: ActivatedRoute) {
      this.contactId = this._route.snapshot.paramMap.get('id');
     }

  ngOnInit() {
    this.message = 'Your Otp is ';
    this.otp = this.genRandomNumber();
  }

    genRandomNumber = () => {

    return Math.floor(100000 + Math.random() * 900000);
 }

 changeOtp = () => {
   this.otp = this.genRandomNumber();
 }

 public sendMessage = (): any => {

  const data = {
    'text': `${this.message} ${this.otp}`,
    'id': this.contactId
  };

  this.providerService.sendMessage(data).subscribe(
    response => {
      if (response.status === 200) {
        console.log(response);
        this.toastr.success('Message Sent', 'Message');
        setTimeout(() => {
          this.router.navigate(['/message-sent-list']);
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
