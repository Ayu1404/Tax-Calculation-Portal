import React, { useState } from 'react';

const TaxCalculator = () => {
    const [incomeDetails, setIncomeDetails] = useState({
        annualIncome: '',
        investments: '',
        otherDeductions: '',
        otherIncome: ''
    });

    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncomeDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateTax = async () => {
        try {
            setError(null);
            setResults(null);

            const response = await fetch('http://localhost:5000/calculate-tax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(incomeDetails)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while calculating tax.');
            }

            const data = await response.json();
            setResults(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    return (
        <div className="mt-20 max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Simple Tax Calculation Portal</h1>
            <form className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Annual Income:</label>
                    <input 
                        type="number" 
                        name="annualIncome" 
                        value={incomeDetails.annualIncome} 
                        onChange={handleChange} 
                        className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Investments (80C, 80D, etc.):</label>
                    <input 
                        type="number" 
                        name="investments" 
                        value={incomeDetails.investments} 
                        onChange={handleChange} 
                        className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Other Deductions (HRA, LTA, etc.):</label>
                    <input 
                        type="number" 
                        name="otherDeductions" 
                        value={incomeDetails.otherDeductions} 
                        onChange={handleChange} 
                        className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Income from Other Sources:</label>
                    <input 
                        type="number" 
                        name="otherIncome" 
                        value={incomeDetails.otherIncome} 
                        onChange={handleChange} 
                        className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                    />
                </div>
                <button 
                    type="button" 
                    onClick={calculateTax} 
                    className="w-full bg-blue-500 text-lg text-white py-3 rounded-md hover:bg-blue-600 transition transform hover:-translate-y-0.5">
                    Calculate Tax
                </button>
            </form>
            {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
                    <p>{error}</p>
                </div>
            )}
            {results && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-700">Results</h2>
                    <div className="mt-4 p-6 bg-gray-50 border rounded-md shadow-sm">
                        <p className="text-lg font-medium">Taxable Income: <span className="text-green-600 font-semibold">{formatCurrency(results.taxableIncome)}</span></p>
                        <p className="text-lg font-medium">Tax Payable: <span className="text-red-600 font-semibold">{formatCurrency(results.taxPayable)}</span></p>
                        <br />
                        <p className="text-lg font-semibold">Tax Savings Suggestions:</p>
                        <ul className="list-disc list-inside">
                            {results.taxSavingsSuggestions.map((suggestion, index) => (
                                <li key={index} className="text-base font-medium text-gray-700">{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaxCalculator;
