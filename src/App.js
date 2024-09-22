import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // State for time remaining in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(0);
  // State to store the user's input for the target date
  const [tempInput, setTempInput] = useState('');
  // State for any validation error messages
  const [error, setError] = useState('');

  // Function to validate the input date format
  const validateInput = (input) => {
    const regex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{4} \d{2}:\d{2}:\d{2}$/;
    return regex.test(input); // Returns true if input matches the format
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const value = e.target.value; // Get the current input value
    setTempInput(value); // Update the tempInput state


    // Check if the input is valid
    if (validateInput(value)) {
      const date = new Date(value); // Convert input to Date object
      const newTimeRemaining = date.getTime() - new Date().getTime(); // Calculate time difference in milliseconds
      setTimeRemaining(newTimeRemaining); // Update timeRemaining state
      setError(''); // Clear any existing error message
    } else {
      // Set an error message if the input is invalid
      setError("Please enter the date in the format 'Sep 22 2024 23:35:45'.");
    }
  };

  // Effect for the countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Update timeRemaining every second
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1000) { // If time is up
          clearInterval(timerInterval); // Stop the timer
          return 0; // Set time remaining to zero
        }
        return prevTime - 1000; // Decrease time remaining by 1000 milliseconds (1 second)
      });
    }, 1000); // Run every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array means this runs once on mount

  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (3600 * 24 * 1000)); // Calculate days
  const hours = Math.floor((timeRemaining % (3600 * 24 * 1000)) / (3600 * 1000)); // Calculate hours
  const minutes = Math.floor((timeRemaining % (3600 * 1000)) / (60 * 1000)); // Calculate minutes
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000); // Calculate seconds

  return (
    <>
      <div>
        <p>Countdown Timer:</p>
        <p>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p> {/* Display countdown */}
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <label htmlFor="dateInput">Enter Date:</label>
          <input
            id="dateInput"
            type="text"
            value={tempInput} // Controlled input with state
            onChange={handleInputChange} // Call handleInputChange on input change
            placeholder="Sep 22 2024 23:35:45" // Placeholder text
          />
          <button type="submit">Submit</button> {/* Button to submit the date */}
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if any */}
        </form>
      </div>
    </>
  );
};

export default CountdownTimer;
