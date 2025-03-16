import React, { useState } from 'react';

const TaxCalculator = () => {
    const [incomeDetails, setIncomeDetails] = useState({
        userName: '',
        userEmail: '',
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

    const resetForm = () => {
        setIncomeDetails({
            userName: '',
            userEmail: '',
            annualIncome: '',
            investments: '',
            otherDeductions: '',
            otherIncome: ''
        });
        setResults(null);
        setError(null);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
    };

    return (
        <div className="flex flex-col items-center p-8 h-screen">
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-blue-600">
                Simple Tax Calculation Portal
            </h1>
            <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl h-full mt-4">
                <div className="one flex-1 p-4 bg-white rounded-lg shadow-lg mb-8 md:mb-0 md:mr-4 overflow-auto h-5/6">
                    <form className="space-y-2">
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Name:</label>
                            <input 
                                type="text" 
                                name="userName" 
                                value={incomeDetails.userName} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Email:</label>
                            <input 
                                type="email" 
                                name="userEmail" 
                                value={incomeDetails.userEmail} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Annual Income:</label>
                            <input 
                                type="number" 
                                name="annualIncome" 
                                value={incomeDetails.annualIncome} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Investments (80C, 80D, etc.):</label>
                            <input 
                                type="number" 
                                name="investments" 
                                value={incomeDetails.investments} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Other Deductions (HRA, LTA, etc.):</label>
                            <input 
                                type="number" 
                                name="otherDeductions" 
                                value={incomeDetails.otherDeductions} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-base sm:text-sm md:text-base font-medium text-gray-700">Income from Other Sources:</label>
                            <input 
                                type="number" 
                                name="otherIncome" 
                                value={incomeDetails.otherIncome} 
                                onChange={handleChange} 
                                className="mt-1 block w-full p-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition-shadow"
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={calculateTax} 
                            className="w-full bg-blue-500  text-base sm:text-sm text-white py-2.5 rounded-md hover:bg-blue-600 transition transform hover:-translate-y-0.5">
                            Calculate Tax
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="w-full mt-2  bg-gray-500 text-base sm:text-sm text-white py-2.5 rounded-md hover:bg-gray-600 transition transform hover:-translate-y-0.5">
                            Reset Form
                        </button>
                    </form>
                </div>
                <div className="two flex-1 p-4 bg-gray-200 rounded-lg shadow-md h-5/6">
                    <h2 className="text-xl sm:text-lg md:text-xl font-bold mb-4">Key Features:</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li className="mb-2">Annual Income Input: Enter your annual income to start the calculation process.</li>
                        <li className="mb-2">Investment Details: Include your investments under sections like 80C, 80D, and more to maximize your tax savings.</li>
                        <li className="mb-2">Deductions: Add deductions such as HRA, LTA, and other eligible expenses.</li>
                        <li>Other Income Sources: Account for income from other sources to ensure accurate tax computation.</li>
                    </ul>
                    {error && (
                        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
                            <p>{error}</p>
                        </div>
                    )}
                    {results && (
                        <div className="mt-8">
                            <h2 className="text-xl sm:text-lg md:text-xl font-bold text-gray-700">Results</h2>
                            <div className="mt-4 p-6 bg-gray-50 border rounded-md shadow-sm">
                                <p className="text-base sm:text-sm md:text-base font-medium">Taxable Income: <span className="text-green-600 font-semibold">{formatCurrency(results.taxableIncome)}</span></p>
                                <p className="text-base sm:text-sm md:text-base font-medium">Tax Payable: <span className="text-red-600 font-semibold">{formatCurrency(results.taxPayable)}</span></p>
                                <br />
                                <p className="text-base sm:text-sm md:text-base font-semibold">Tax Savings Suggestions:</p>
                                <ul className="list-disc list-inside">
                                    {results.taxSavingsSuggestions.map((suggestion, index) => (
                                        <li key={index} className="text-sm sm:text-xs md:text-sm font-medium text-gray-700">{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaxCalculator;
