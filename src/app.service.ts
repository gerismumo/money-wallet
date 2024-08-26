import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Money Tracker API Documentation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                h1 {
                    color: #333;
                }
                h2 {
                    color: #555;
                }
                p {
                    font-size: 16px;
                    color: #666;
                }
                code {
                    background-color: #eee;
                    padding: 2px 4px;
                    border-radius: 4px;
                }
                pre {
                    background-color: #eee;
                    padding: 10px;
                    border-radius: 4px;
                    overflow-x: auto;
                }
                ul {
                    margin-left: 20px;
                    color: #666;
                }
                .endpoint {
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .endpoint h3 {
                    margin-top: 0;
                }
                .endpoint p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
          <h1>Money Tracker API Documentation</h1>
          <p>Welcome to the Money Tracker API documentation. This API allows users to manage multiple wallets, track their expenses and incomes, and view detailed information about their finances.</p>

          <h2>Prerequisites</h2>
          <p>Before using the APIs, ensure that you have MongoDB connectivity properly configured in .env file. The application requires a MongoDB instance to store and manage user data, wallets, and transactions.</p>
          
          <h2>User Flow</h2>
          <ul>
              <li>A user signs up (no sign in required. Disregard authentication).</li>
              <li>A user can create wallets.</li>
              <li>A user can add expenses or incomes to a wallet.</li>
              <li>A user can view their profile with a summary of wallets and balances. Show overall balance of all wallets and balance of each wallet.</li>
              <li>A user can drill into each wallet to see balance and transactions.</li>
          </ul>

          <h2>API Endpoints</h2>
          
          <div class="endpoint">
              <h3>1. User Signup</h3>
              <p><strong>Endpoint:</strong> <code>POST /user/auth/signup</code></p>
              <p><strong>Description:</strong> Register a new user in the system.</p>
              <p><strong>Request Body:</strong></p>
              <pre>
                {
                  "firstName": "",
                  "lastName": "",
                  "userName": "",
                  "email": "",
                  "password": ""
                }
              </pre>
          </div>

          <div class="endpoint">
              <h3>2. Create Wallet</h3>
              <p><strong>Endpoint:</strong> <code>POST /wallet/add/:userId</code></p>
              <p><strong>Description:</strong> Create a new wallet for a user.</p>
              <p><strong>Request Body:</strong></p>
              <pre>
                {
                  "name": ""
                }
              </pre>
              <p><strong>Parameters:</strong> <code>:userId</code> - The ID of the user creating the wallet.</p>
          </div>

          <div class="endpoint">
            <h3>3. View User Profile</h3>
            <p><strong>Endpoint:</strong> <code>GET /user/profile/:userId</code></p>
            <p><strong>Description:</strong> Retrieve the user's profile with a summary of wallets and their balances.</p>
            <p><strong>Response Example:</strong></p>
            <pre>
              {
                "user": {
                    "id": "",
                    "firstName": "",
                    "lastName": "",
                    "email": ""
                },
                "overallBalance": ,
                "wallets": [
                    {
                        "name": "",
                        "balance": 
                    },
                    {
                        "name": "",
                        "balance": 
                    }
                ]
              }
            </pre>
          <p><strong>Parameters:</strong> <code>:userId</code> - The ID of the user whose profile is being viewed.</p>
      </div>

      <div class="endpoint">
          <h3>4. Add Transaction (Income/Expense)</h3>
          <p><strong>Endpoint:</strong> <code>POST /transaction/:walletId</code></p>
          <p><strong>Description:</strong> Add an income or expense transaction to a wallet.</p>
          <p><strong>Request Body:</strong></p>
          <pre>
            {
              "userId": "",
              "type": "", - use(expense or income)
              "amount": ,
              "description": ""
            }
          </pre>
          <p><strong>Parameters:</strong> <code>:walletId</code> - The ID of the wallet to which the transaction is being added.</p>
      </div>

          <div class="endpoint">
              <h3>5. Wallet Details</h3>
              <p><strong>Endpoint:</strong> <code>GET /wallet/details/:walletId/:userId</code></p>
              <p><strong>Description:</strong> Retrieve detailed information about a specific wallet, including its balance and transactions.</p>
              <p><strong>Response Example:</strong></p>
              <pre>
                {
                  "walletName": "",
                  "balance": ,
                  "transactions": [
                      {
                          "amount": ,
                          "type": "",
                          "description": "",
                          "date": ""
                      },
                      {
                          "amount": ,
                          "type": "",
                          "description": "",
                          "date": ""
                      },
                  ]
                },
              </pre>
              <p><strong>Parameters:</strong> <code>:walletId</code> - The ID of the wallet being viewed.<br><code>:userId</code> - The ID of the user who owns the wallet.</p>
          </div>
          <p>Use the above endpoints to interact with the Money Tracker API and manage your wallets, expenses, and incomes effectively.</p>
      </body>
      </html>
    `;
  }
}
