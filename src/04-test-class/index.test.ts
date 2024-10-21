// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAcc = getBankAccount(1000)
    expect(bankAcc.getBalance()).toBe(1000)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAcc = getBankAccount(1000)
    expect(() => bankAcc.withdraw(2000)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    const bankAcc = getBankAccount(1000)
    const toBankAcc = getBankAccount(100)
    expect(() => bankAcc.transfer(2000, toBankAcc)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    const bankAcc = getBankAccount(1000)
    expect(() => bankAcc.transfer(200, bankAcc)).toThrow(TransferFailedError)
  });

  test('should deposit money', () => {
    const bankAcc = getBankAccount(1000)
    bankAcc.deposit(200)
    expect(bankAcc.getBalance()).toBe(1200)
  });

  test('should withdraw money', () => {
    const bankAcc = getBankAccount(1000)
    bankAcc.withdraw(200)
    expect(bankAcc.getBalance()).toBe(800)
  });

  test('should transfer money', () => {
    const bankAcc = getBankAccount(1000)
    const toBankAcc = getBankAccount(200)
    bankAcc.transfer(50, toBankAcc)
    expect(bankAcc.getBalance()).toBe(950)
    expect(toBankAcc.getBalance()).toBe(250)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAcc = getBankAccount(100)
    const fetchNumber = await bankAcc.fetchBalance()
    if(fetchNumber) {
      expect(typeof fetchNumber).toBe('number')
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAcc = getBankAccount(100)
    jest.spyOn(bankAcc, 'fetchBalance').mockResolvedValue(150)
    await bankAcc.synchronizeBalance()
    expect(bankAcc.getBalance()).toBe(150)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAcc = getBankAccount(100)
    jest.spyOn(bankAcc, 'fetchBalance').mockResolvedValue(null)
    await expect(bankAcc.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError)
  });
});
