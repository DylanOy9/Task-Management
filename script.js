
// Chosen Time Duration Loop
const timeDuration = document.getElementById('task-select-b');
for (let i = 1; i <= 400; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} minute${i !== 1 ? 's' : ''}`;
    timeDuration.appendChild(option);
}

const taskInput = document.getElementById("task-input");
    taskInput.value = localStorage.getItem("taskValue") || "";
    taskInput.addEventListener("input", () => {
        localStorage.setItem("taskValue", taskInput.value);
    });


// Chosen Task and Durations Form
function combineFormData() {
    const taskInput = document.getElementById("task-input"); // Updated ID
    const durationSelect = document.getElementById("task-select-b");

    // Get the input value
    const taskValue = taskInput.value.trim(); // Retrieve the typed value
    const durationOption = durationSelect.options[durationSelect.selectedIndex].text;

    // Combine the selected options
    const combinedOptions = `${taskValue} - ${durationOption}`;

    // Get the existing combined data
    const existingData = document.getElementById("combinedData").value;

    // Append the new options (separated by commas)
    const updatedData = existingData ? `${existingData}, ${combinedOptions}` : combinedOptions;

    // Update the input field
    document.getElementById("combinedData").value = updatedData;

    // Show the clearButton
    document.getElementById("clearButton").style.display = "inline-block";
}

// Function to clear the combined data
function clearCombinedData() {
    // Reset the input field value
    document.getElementById("combinedData").value = "";

    // Hide the clear button
    document.getElementById("clearButton").style.display = "none";
}


function combinedMin() {
    const minSelect = document.getElementById("task-select-b");
    const minOption = minSelect.options[minSelect.selectedIndex].text;

    // Extract numeric value from the selected option text
    const numericValue = parseFloat(minOption);

    const existingMin = document.getElementById("combinedMin").value;

    // Extract numeric value from the existing value (if it contains numbers)
    const existingNumericValue = parseFloat(existingMin) || 0;

    // Add the numeric values together
    const result = existingNumericValue + numericValue;

    // Update the input field with the new result and append "minutes"
    document.getElementById("combinedMin").value = result + " minutes";
}

function clearCombinedMin() {
    // Reset the input field value
    document.getElementById("combinedMin").value = "";

    // Hide the clear button
    document.getElementById("clearButton").style.display = "none";
}



// Pie Chart
const totalMin = document.querySelector('.total-input');
const minInput = document.querySelector('.minutes-input');
const timeInput = document.querySelector('.time-input');

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Total Amount of Work', 'Down Time'],
        datasets: [
            {
                label: '# of votes',
                data: [0, 0, 0],
                backgroundColor: ['#2adece', '#dd3b79'],
                borderWidth: 1,
            },
        ],
    },
});

const updateChartValue = (input) => {
    input.addEventListener('change', () => {
        const minInputValue = parseFloat(minInput.value) || 0;
        const timeInputValue = parseFloat(timeInput.value) || 0;

        // Calculate the difference (timeInput - minInput)
        const difference = timeInputValue - minInputValue;

        // Update the chart data
        myChart.data.datasets[0].data[0] = timeInputValue;
        myChart.data.datasets[0].data[1] = Math.abs(difference);
        myChart.update();

        // Display the difference in the totalMin input field
        totalMin.value = Math.abs(difference).toFixed(2);
    });
};

updateChartValue(timeInput);
updateChartValue(minInput);
