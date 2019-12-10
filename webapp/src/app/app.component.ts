import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { IAccountData } from './app.interface';
import { Subscription } from 'rxjs';

// TODO: unit tests for this class
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
  title = 'AccountsApp';

  getAccuntsInfo: Subscription;
  accountData: IAccountData[];
  activeAccountsData: IAccountData[];
  overdueAccountsData: IAccountData[];
  inactiveAccountsData: IAccountData[];

  constructor(private $service: AppService) { }

  private getAccountData() {
    this.getAccuntsInfo = this.$service.getAccuntsInfo().subscribe(
      (data) => {
        this.accountData = data.map(x => {
          return {// TODO: find a better way to do this
            ...x,
            phoneNumber: this.formatPhoneNumber(x.phoneNumber),
            paymentDueDate: x.paymentDueDate ? new Date(x.paymentDueDate).toLocaleDateString() : null,
            amountDueToDisplay: x.amountDue.toFixed(2)
          };
        });
        this.activeAccountsData = this.accountData.filter(x => x.accountStatusId === 0);
        this.overdueAccountsData = this.accountData.filter(x => x.accountStatusId === 1);
        this.inactiveAccountsData = this.accountData.filter(x => x.accountStatusId === 2);
      },
      err => console.error(err),
      () => console.log('done loading accounts' + ' ' + this.accountData),
    );
  }

  private formatPhoneNumber(phoneNumber: string){
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  ngOnInit(): void {
    this.getAccountData();
  }
  ngOnDestroy(): void {
    if (this.getAccuntsInfo != null) {
      this.getAccuntsInfo.unsubscribe();
    }
  }
}
