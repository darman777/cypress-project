const randomAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

export const billPayData = {
    payeeName: 'Test Payee',
    payeeAddress: '123 Main St',
    payeeCity: 'Anytown',
    payeeState: 'CA',
    payeeZipCode: '12345',
    payeePhoneNumber: '123-456-7890',
    payeeAccountNumber: randomAccountNumber,
    verifyAccount: randomAccountNumber,
    amount: '100'
}