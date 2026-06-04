-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageProfile" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Wallet" (
    "walletId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" DECIMAL NOT NULL DEFAULT 0.00,
    "totalEarning" DECIMAL NOT NULL DEFAULT 0.00,
    "totalDeposit" DECIMAL NOT NULL DEFAULT 0.00,
    "highestProfit" DECIMAL NOT NULL DEFAULT 0.00,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "History" (
    "historyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bet" DECIMAL NOT NULL,
    "multiple" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "status" TEXT NOT NULL,
    "walletId" INTEGER NOT NULL,
    CONSTRAINT "History_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("walletId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL PRIMARY KEY,
    "method" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL NOT NULL,
    "walletId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("walletId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
