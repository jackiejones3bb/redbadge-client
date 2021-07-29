# loYOUlty - a customer loyalty rewards app

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
    DELETE /delete-punch/:id    => Delete punch
    GET /reward-status/:id      => Get reward status by ID
    
### Membership: ~/memberships
    DELETE/:id                  => Delete membership
    POST/                       => Add membership
    PUT/:id                     => Update number of punches      

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
