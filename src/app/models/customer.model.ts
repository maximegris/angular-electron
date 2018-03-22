class Customer {
  customerNumber: string;
  customerName: string;
  legalName: string;
  taxID: string;
  storePhone: string;
  cellPhone: string;
  email: string;

  constructor() {
    this.customerNumber = '';
    this.customerName = '';
    this.legalName = '';
    this.taxID = '';
    this.storePhone = '';
    this.cellPhone = '';
    this.email = '';
  }
}

export default Customer;
