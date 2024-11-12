import React, { useState } from 'react';
import './NumberAdder.css'; // Optional: If you want to style it later

function NumberAdder() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [sum, setSum] = useState(null);
    const [sumInWords, setSumInWords] = useState('');

    // Function to convert numbers to words
    const convertNumberToWords = (number) => {
        const words = [
            'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
            'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
        ];
        if (number < 21) return words[number];
        if (number < 100) return words[18 + Math.floor(number / 10)] + (number % 10 === 0 ? '' : '-' + words[number % 10]);
        return 'Number too large to convert';
    };

    // Handler to calculate the sum
    const handleAddition = () => {
        const sumValue = parseInt(num1) + parseInt(num2);
        setSum(sumValue);
        setSumInWords(convertNumberToWords(sumValue));
    };

    return (
        <div className="container">
            <h1>Add Two Numbers</h1>
            <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Enter first number"
                className="input-field"
            />
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Enter second number"
                className="input-field"
            />
            <button onClick={handleAddition} className="add-button">Add</button>
            {sum !== null && (
                <div className="result">
                    <h2>Sum: {sum}</h2>
                    <h2>In Words: {sumInWords}</h2>
                </div>
            )}
        </div>
    );
}

export default NumberAdder;
