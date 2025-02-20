import express from "express";
import cors from "cors";
const app = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

app.post('/calculate-tax', (req, res) => {
    try {
        // Destructure the input data from the request body
        const { annualIncome, investments, otherDeductions, otherIncome } = req.body;

        // Validate the input data
        if (
            annualIncome === undefined ||
            investments === undefined ||
            otherDeductions === undefined ||
            otherIncome === undefined
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Ensure inputs are numbers
        const income = parseFloat(annualIncome);
        const investment = parseFloat(investments);
        const deductions = parseFloat(otherDeductions);
        const otherIncomeSources = parseFloat(otherIncome);

        if (isNaN(income) || isNaN(investment) || isNaN(deductions) || isNaN(otherIncomeSources)) {
            return res.status(400).json({ error: "Invalid input data. Please provide valid numbers." });
        }

        // Calculate taxable income
        const taxableIncome = income - investment - deductions + otherIncomeSources;

        // Calculate tax based on Indian tax slabs for FY 2024-25
        let taxPayable = 0;
        if (taxableIncome <= 300000) {
            taxPayable = 0;
        } else if (taxableIncome <= 700000) {
            taxPayable = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            taxPayable = (taxableIncome - 700000) * 0.10 + 20000;
        } else if (taxableIncome <= 1200000) {
            taxPayable = (taxableIncome - 1000000) * 0.15 + 50000;
        } else if (taxableIncome <= 1500000) {
            taxPayable = (taxableIncome - 1200000) * 0.20 + 80000;
        } else {
            taxPayable = (taxableIncome - 1500000) * 0.30 + 140000;
        }

        // Tax Savings Suggestions (Optional)
        const taxSavingsSuggestions = [
            "Invest more in Section 80C to maximize your deductions.",
            "Consider tax-saving FD schemes."
        ];

        // Send the calculated data as a response
        res.json({
            taxableIncome,
            taxPayable,
            taxSavingsSuggestions
        });

    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({ error: "An error occurred while calculating tax." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
