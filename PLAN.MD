Hi, I want to clarify how I want the crypto deposit system and admin panel to work.

The deposit process should be 100% manual, not automatic.

User Flow

* A user creates an account and logs in.
* The user goes to the Deposit page.
* The user selects the cryptocurrency/network (BTC, ETH, USDT TRC20, USDT ERC20, BNB, etc.).
* The system displays the corresponding wallet address.
* The user sends the crypto, enters the deposit amount, transaction hash, and uploads proof if required.
* When the user submits the deposit, the amount must NOT be credited immediately. Instead, the deposit should be saved with a Pending status.

User Dashboard

The user should see the deposit listed as Pending Approval. Their account balance must remain unchanged until the deposit is reviewed by an admin.

Admin Panel

The admin dashboard should include a Deposits section where all pending deposits are displayed.

For each deposit, the admin should be able to view:

* User information
* Deposit amount
* Cryptocurrency and network
* Wallet address used
* Transaction hash
* Uploaded proof (if available)
* Date and time of submission

The admin should have two actions:

* Approve
* Reject

If the admin verifies that the crypto has actually been received and the transaction is legitimate, clicking Approve should:

* Change the deposit status to Approved
* Credit the deposit amount to the user’s wallet balance
* Record which admin approved it and the approval time

If the transaction is invalid or cannot be verified, clicking Reject should:

* Change the status to Rejected
* Leave the user’s balance unchanged
* Optionally include a rejection reason visible to the user

Wallet Management

The admin panel should also have a Wallet Settings page where the admin can:

* Add, edit, or replace wallet addresses
* Manage supported cryptocurrencies and networks
* Enable or disable specific coins without changing the frontend code

Important Business Rule

The frontend should never be able to update a user’s balance directly. A user’s balance should only change after an admin manually approves a verified deposit from the admin dashboard.unchanged).

Withdrawal Flow

* Before requesting a withdrawal, the user must provide their personal withdrawal wallet address.
* When the user submits a withdrawal request, it should remain Pending.
* The admin reviews the request and manually approves or rejects it.
* Once approved and the transfer is sent, the withdrawal status should be updated accordingly.

KYC Verification

Any documents uploaded by the user for KYC (such as a passport, driver’s licence, national ID, or proof of address) should be available for review in the admin dashboard.
The admin should be able to approve or reject KYC submissions and update the user’s verification status.

Security

All deposit requests, withdrawals, KYC documents, and user data should be securely stored and accessible only to authorised administrators.You no a coin can have different networks