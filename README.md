# loYOUlty

### This app is designed for small business owners and their customers. Business owners can create a simple, stream-lined customer loyalty program that fits the needs of their business, and customers can easily enroll in their favorite customer loyalty programs. Everything is managed online.

### Created by: Jackie Jones - github.com/jackiejones3bb

## App Features

### Business Owners:

  - Create a business account
  - Create and update a customer loyalty program
  - Search customer by name
  - Manage customer loyalty punches (add and delete)

### Customers:

  - Create a customer account
  - View current loyalty program memberships
  - View available loyalty programs
  - Add and delete customer loyalty programs from their membership list
  - View current reward status for enrolled memberships

## App Endpoints

### Users: ~/users
    GET /userInfo/:id           => Get user by ID
    POST /register-customer     => Registers new customer account
    POST /register-busienss     => Registers new business account
    POST /login                 => Logs in user 
    
### Business: ~/business
    GET /:id                    => Get buisness by ID
    GET /                       => Get all businesses

### LoyaltyPrograms: ~/programs
    GET /:id                    => Get program by ID
    POST /                      => Create loyalty program
    PUT /:id                    => Update a program
    DELETE /:id                 => Delete a program
 
 ### Customer: ~/customers
    GET /:id                    => Get customer by ID
    GET /                       => Get all customers for business
    
 ### RewardTracking: ~/rewards
    GET /                       => Get rewards
    GET /:id                    => Get rewards by userID
    POST /add-punch             => Add punch
    DELETE /delete-punch        => Delete punch
