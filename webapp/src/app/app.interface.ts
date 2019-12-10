export interface IAccountData {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  amountDue: number;
  paymentDueDate: string;
  accountStatusId: AccountStatuses;
  amountDueToDisplay: string;
}

enum AccountStatuses {Active, Inactive, Overdue}
