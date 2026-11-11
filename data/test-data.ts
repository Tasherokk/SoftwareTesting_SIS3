export const TEST_DATA = {
  validUser: {
    email: process.env.TEST_EMAIL as string,
    password: process.env.TEST_PASSWORD as string,
  },
  invalidUser: {
    email: 'wrong.user@practicesoftwaretesting.com',
    password: 'InvalidPassword999!',
  },
  invalidEmailFormat: 'not-an-email',
  billingAddress: {
    country: 'US',
    postalCode: '10001',
    houseNumber: '12',
    street: 'Broadway',
    city: 'New York',
    state: 'NY',
  },
  paymentMethods: {
    cashOnDelivery: 'cash-on-delivery',
    bankTransfer: 'bank-transfer',
  },
};
