# Simple Tax Calculation Portal

Welcome to the Simple Tax Calculation Portal! This application allows users to input their annual income, investments, other deductions, and income from other sources to calculate their taxable income and tax payable. It also provides tax savings suggestions based on the provided information.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Calculate taxable income and tax payable
- Input fields for annual income, investments, other deductions, and income from other sources
- Display tax savings suggestions

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/simple-tax-calculation-portal.git
    ```

2. Change to the project directory:

    ```sh
    cd simple-tax-calculation-portal
    ```

3. Install the required dependencies:

    ```sh
    npm install
    ```

4. Start the backend server:

    ```sh
    cd backend
    npm install
    npm start
    ```

5. Start the frontend development server:

    ```sh
    cd frontend
    npm install
    npm start
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:5000](http://localhost:5000) for the backend.

## Usage

1. Open the application in your web browser:

    ```sh
    http://localhost:3000
    ```

2. Enter your annual income, investments, other deductions, and income from other sources in the respective input fields.

3. Click the "Calculate Tax" button to calculate your taxable income and tax payable.

4. View the results and tax savings suggestions.


## API Documentation
Description: Calculates the taxable income and tax payable based on the provided input details.

1)  Request:
    URL: /calculate-tax
    Method: POST
    Headers: Content-Type: application/json
    Body:
      annualIncome (number) - The annual income of the user.
      investments (number) - The investments made by the user (80C, 80D, etc.).
      otherDeductions (number) - Other deductions (HRA, LTA, etc.).
      otherIncome (number) - Income from other sources.
  
    Request Example:
    json
    {
        "annualIncome": 1000000,
        "investments": 150000,
        "otherDeductions": 50000,
        "otherIncome": 20000
    }


3)  Response:

    a) Success Response:
       Status Code: 200 OK
       Body:
          taxableIncome (number) - The calculated taxable income.
          taxPayable (number) - The calculated tax payable.
          taxSavingsSuggestions (array) - Suggestions for saving tax.

      Success Response Example:

      json
      {
          "taxableIncome": 800000,
          "taxPayable": 70000,
          "taxSavingsSuggestions": [
              "Invest more in Section 80C to maximize your deductions.",
        "Consider tax-saving FD schemes."
          ]
      }


    b) Error Responses:
       i) Status Code: 400 Bad Request
           Body:
             error (string) - A message describing the error.
    
           Error Response Example:
    
           json
           {
              "error": "Invalid input data. Please provide valid numbers."
           }
    
      ii) Status Code: 500 Internal Server Error
          Body:
             error (string) - A message describing the error.

          Error Response Example:
          json
          {
              "error": "An error occurred while calculating tax."
          }


Common Errors
a) 400 Bad Request: This error occurs when the input data is missing or invalid.
    Example: {"error": "All fields are required."}
    Example: {"error": "Invalid input data. Please provide valid numbers."}

b) 500 Internal Server Error: This error occurs when an unexpected error happens on the server.
    Example: {"error": "An error occurred while calculating tax."}

