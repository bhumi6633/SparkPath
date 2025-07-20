import React, { useState, useEffect } from 'react';

function FindaRideStats() {
    const [co2Saved, setCo2Saved] = useState(0);
    const [timeSaved, setTimeSaved] = useState(0);

    // Generate random statistics
    const generateRandomStats = () => {
        // CO2 saved: random between 5-25 kg (increased range for carpooling)
        const randomCo2 = Math.floor(Math.random() * 21) + 5;
        
        // Time saved: random between 5-45 minutes (realistic for HOV lanes)
        const randomTime = Math.floor(Math.random() * 41) + 5;
        
        setCo2Saved(randomCo2);
        setTimeSaved(randomTime);
    };

    // Generate stats on component mount
    useEffect(() => {
        generateRandomStats();
    }, []);

    return (
        <div className="find-a-ride-stats">
            <h2>Statistics</h2>
            <h3>CO2 Saved: {co2Saved}kg</h3>
            <h3>Time Saved: {timeSaved} minutes</h3>
        </div>
    );
}

export default FindaRideStats;