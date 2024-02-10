import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initBalance = 100;
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(initBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testCase = () => bankAccount.withdraw(101);

    expect(testCase).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const testCase = () => bankAccount.transfer(101, getBankAccount(99));

    expect(testCase).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const testCase = () => bankAccount.transfer(1, bankAccount);

    expect(testCase).toThrow();
  });

  test('should deposit money', () => {
    bankAccount.deposit(1);

    expect(bankAccount.getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(1);

    expect(bankAccount.getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    bankAccount.transfer(100, getBankAccount(0));

    expect(bankAccount.getBalance()).toBe(0);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest.spyOn(lodash, 'random').mockReturnValue(10);
    const balance = await bankAccount.fetchBalance();

    await expect(bankAccount.fetchBalance()).resolves.toBe(10);
    expect(typeof balance).toBe('number');

    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest.spyOn(lodash, 'random').mockReturnValue(10);
    await bankAccount.fetchBalance();
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(10);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    bankAccount.fetchBalance = jest.fn(async () => null);

    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
