# **Tax Calculation Portal**

A web application designed to simplify tax calculations by allowing users to input their financial details and calculate taxes based on Indian tax slabs for FY 2024-25. The portal combines a responsive React.js front-end with a robust Express.js and PostgreSQL back-end for seamless tax computation and secure data storage.

---

## **Features**
- **Responsive UI**: Built with React.js, ensuring a clean and intuitive user interface.
- **Form-Based Inputs**:
  - Collects user data including name, email, annual income, investments, deductions, and income from other sources.
- **Real-Time Tax Calculation**:
  - Fetches results instantly from the back-end API, including taxable income and payable tax.
- **Error Handling**:
  - Validates user inputs and provides clear error messages for invalid or missing fields.
- **Tax Savings Suggestions**:
  - Offers actionable recommendations to maximize tax deductions.
- **Reset Functionality**:
  - Easily clears the form for a fresh start.

---

## **Getting Started**

### **Prerequisites**
- **Node.js**: To run the back-end server.
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayu1404/Tax-Calculation-Portal.git
   cd Tax-Calculation-Portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file in the root directory with your PostgreSQL credentials:
   ```plaintext
   PORT=5000
   DB_USER=your_database_user
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=your_database_port
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```plaintext
   http://localhost:3000
   ```

---

## **Technologies Used**
- **React.js**: Front-end framework for responsive user interfaces and dynamic functionality.
- **Express.js**: Back-end framework for managing API endpoints.
- **PostgreSQL**: Database for secure and efficient data storage.
- **Node.js**: Runtime environment for server-side development.
- **TailwindCSS**: Used for styling the front end.
- **dotenv**: For securely managing environment variables.
- **CORS**: Middleware for seamless interaction between the front-end and back-end.

---

## **API Endpoints**
### **Base URL**: `http://localhost:5000`

| HTTP Method | Endpoint          | Description                                          |
|-------------|-------------------|------------------------------------------------------|
| **POST**    | `/calculate-tax`  | Accepts user financial data, calculates tax, and stores it |

### **Request/Response Examples**

#### Calculate Tax
- **POST** `/calculate-tax`
- **Request Body**:
  ```json
  {
    "userName": "John Doe",
    "userEmail": "john.doe@example.com",
    "annualIncome": 1200000,
    "investments": 150000,
    "otherDeductions": 100000,
    "otherIncome": 50000
  }
  ```
- **Response**:
  ```json
  {
    "taxableIncome": 700000,
    "taxPayable": 20000,
    "taxSavingsSuggestions": [
        "Invest more in Section 80C to maximize your deductions.",
        "Consider tax-saving FD schemes."
    ],
    "savedData": {
        "id": 1,
        "user_name": "John Doe",
        "user_email": "john.doe@example.com",
        "annual_income": 1200000,
        "investments": 150000,
        "other_deductions": 100000,
        "other_income": 50000,
        "taxable_income": 700000,
        "tax_payable": 20000
    }
  }
  ```

---

## **Usage**
### **Frontend Features**:
- Enter financial details through an interactive form.
- View calculated tax results and suggestions in real time.
- Reset the form to clear inputs and results.

### **Backend API**:
- Uses `/calculate-tax` to process user data and compute taxes.

### **Testing**:
- Test the app's front end by accessing `http://localhost:3000` and interacting with the form.
- Use tools like **Postman** or **curl** to verify API endpoints.

---

## **Contributing**
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License, allowing you to modify and distribute the project with proper attribution.

---

## **Acknowledgments**
- This project was built to simplify tax calculations for users.
- Thanks to the open-source libraries and frameworks that made development possible.

