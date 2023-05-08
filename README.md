# virtual-wallet-fotoley
# Requirements

1.	User should be able to register and sign in to the Wallet.
2.	There will be two types of users - premium and non-premium. This should be chosen at the time of sign up.
3.	When someone signs up as a Premium user, INR 2,500 will be credited to his wallet automatically. And if the sign up is non-premium then INR 1,000 will be credited to the users wallet.
4.	Users can send and receive money, to and from respectively from other users, except the super user.
5.	Sending Money - Sender (Any user) can select any other user and send money to him/her. Both Sender and receiver will pay charges for the transaction as per Table 1. The transaction charges debited from the users will be credited to the Super Users wallet.
6.	Requesting Money - Requester (Any user) can select any other user and request money from him/her. The user receiving the request will have the option to accept or deny the request. If the request receiver accepts, both sender and receiver will pay charges for the transaction as per Table 1. The transaction charges will be credited to the Super Users wallet.
7.	Each User should be able to see their wallet balance.
8.	Each User should be able to see all his transactions.
9.	Each User should be able to see all the Money requests, action and status.

<h2>Table 1 - Schedule of Charges</h2>

<table>
<tr>
    <th>
    Action
    </th>
    <th>
    Premium User
    </th>
    <th>
    Non-premium User
    </th>
</tr>
<tr>
    <td>Sending </td>
    <td> 3%</td>
    <td> 5%</td>
</tr>
<tr>
    <td>Receiving </td>
    <td> 1%</td>
    <td> 3%</td>
</tr>
</table>

## Functionality

# Admin
1. Signin and Signup 
2. Check primium user and non-primium users
3. view Balance 
4. view transaction
    
# primium User
1. Signin and Signup 
2. send money 
3. request money
4. view transation 

# non-primium User
1. Signin and Signup 
2. send money 
3. request money
4. view transation 
  
##Tools

1. Node Js v-16.18.0
2. Express Js
3. Mongodb atlas
4. Mongoose
5. Ejs
6. Bootstrap 5
7. passport local (for authentication purpose)
8. express-session (for create,incript and store cookie)
9. connect-mongo (for storing cookie inside db)
10. connect-flash and noty (for display notification)

##Setup in Local System

1. git clone "https://github.com/tush8788/Online-Bank.git"
2. open command prompt and Type 'npm install' for download all dependencies
3. then just "npm start"/ if npm start is not work just run this command 'node index.js'
4. then go localhost:8000

## This Site is hosted on render (this site is hosted on free tier thats why its take some time to the load)
1. Access link "https://virtual-wallet-fotoley.onrender.com/"
