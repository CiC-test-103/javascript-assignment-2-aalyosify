// 🏦 Bank and Account System
// Bank Class: Manages multiple accounts
class Bank {
  constructor() {
    this.accounts = []; // Stores all accounts in the bank
  }

  // Add methods here:
  // Example: createAccount(name, initialDeposit)
  createAccount(name, initialDeposit) {
    try {
      if (initialDeposit < 0)
        throw new Error("Initial deposit cannot be negative");
      const account = new Account(name, initialDeposit);
      this.accounts.push(account);
      return account;
    } catch (error) {
      console.error(`Error creating account: ${error.message}`);
    }
  }
}

// Account Class: Represents a single user's account
class Account {
  constructor(name, balance = 0) {
    this.name = name; // Account holder's name
    this.balance = balance; // Initial balance (default is 0)
    this.transactionHistory = []; // Keeps a record of all transactions
  }

  // Add methods here:
  // Example: deposit(amount)
  // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

  deposit(amount) {
    try {
      if (amount <= 0)
        throw new Error("Deposit amount must be greater than zero");
      this.balance += amount;
      this.transactionHistory.push({ transactionType: "Deposit", amount });
    } catch (error) {
      console.error(`Error depositing money: ${error.message}`);
    }
  }

  // Example: withdraw(amount)
  // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
  withdraw(amount) {
    try {
      if (amount <= 0)
        throw new Error("Withdrawal amount must be greater than zero");
      if (amount > this.balance) throw new Error("Insufficient funds");
      this.balance -= amount;
      this.transactionHistory.push({ transactionType: "Withdrawal", amount });
    } catch (error) {
      console.error(`Error withdrawing money: ${error.message}`);
    }
  }

  // Example: transfer(amount, recipientAccount)
  // example data to be stored in transactionHistory:
  // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
  // for account recieving { transactionType: 'Received', amount: 300, from: senderName }

  transfer(amount, recipientAccount) {
    try {
      if (!(recipientAccount instanceof Account))
        throw new Error("Invalid recipient account");
      if (amount <= 0)
        throw new Error("Transfer amount must be greater than zero");
      if (amount > this.balance) throw new Error("Insufficient funds");

      this.withdraw(amount);
      recipientAccount.deposit(amount);

      this.transactionHistory.push({
        transactionType: "Transfer",
        amount,
        to: recipientAccount.name,
      });
      recipientAccount.transactionHistory.push({
        transactionType: "Received",
        amount,
        from: this.name,
      });
    } catch (error) {
      console.error(`Error transferring money: ${error.message}`);
    }
  }

  // Example: checkBalance()
  checkBalance() {
    try {
      return this.balance;
    } catch (error) {
      console.error(`Error checking balance: ${error.message}`);
    }
  }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
  const bank = new Bank();

  // Create new accounts
  const johnAccount = bank.createAccount("John Doe", 1000);
  const janeAccount = bank.createAccount("Jane Doe", 500);
  console.log("Accounts created:", johnAccount, janeAccount);

  // Perform some operations on John's account
  johnAccount.deposit(500);
  johnAccount.withdraw(200);

  // Perform a transfer from John to Jane
  johnAccount.transfer(300, janeAccount);

  // Check balances
  const johnFinalBalance = johnAccount.checkBalance();
  const janeFinalBalance = janeAccount.checkBalance();
  console.log("John's balance:", johnFinalBalance);
  console.log("Jane's balance:", janeFinalBalance);

  // Return balances for testing
  return {
    johnFinalBalance,
    janeFinalBalance,
    johnTransactionHistory: johnAccount.transactionHistory,
    janeTransactionHistory: janeAccount.transactionHistory,
  };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

console.log(testBankOperations());
