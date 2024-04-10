const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendar = document.getElementById('calendar');
const controls = calendar.querySelector('#controls');
const monthSelect = controls.querySelector('#month');
const yearSelect = controls.querySelector('#year');
const prevButton = controls.querySelector('#prev');
const nextButton = document.getElementById('next');
const daysTable = calendar.querySelector('#days tbody');
const selectedDate = document.getElementById('selected-date');
const timingSlots = document.getElementById('timing-slots'); // Moved to global scope
const selectedDateContainer = document.getElementById('selected-date-container');


let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedYear = currentYear; // Moved to global scope
let selectedMonth = currentMonth; // Moved to global scope

// Populate the year select element
for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

// Set the initial values of the select elements
monthSelect.value = currentMonth;
yearSelect.value = currentYear;

// Update the calendar display
updateCalendar();

// Set up event listeners for the controls
monthSelect.addEventListener('change', updateCalendar);
yearSelect.addEventListener('change', updateCalendar);
prevButton.addEventListener('click', () => { currentMonth--; updateCalendar(); });
nextButton.addEventListener('click', () => { currentMonth++; updateCalendar(); });

function updateCalendar() {
    // Clear the days table
    daysTable.innerHTML = '';

    // Get the selected year and month
    selectedYear = parseInt(yearSelect.value); // Updated to global variable
    selectedMonth = parseInt(monthSelect.value); // Updated to global variable

    // Get the first day of the selected month
    const firstDay = new Date(selectedYear, selectedMonth, 1);

    // Get the number of days in the selected month
    const numDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    // Get the day of the week of the first day of the month
    const dayOfWeek = firstDay.getDay();

    // Add the days of the week headers
    const headerRow = daysTable.insertRow();
    for (let i = 0; i < 7; i++) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = days[(i + 1) % 7]; // Updated index to start from Sunday
    }

    // Add the days of the month
    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
        const row = daysTable.insertRow();
        for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            if (i === 0 && j < dayOfWeek) {
                // Empty cells for the days before the first day of the month
                cell.textContent = '';
            } else if (currentDay > numDays) {
                // Empty cells for the days after the last day of the month
                cell.textContent = '';
            } else {
                // Days of the month
                cell.textContent = currentDay;
                currentDay++;
            }
        }
    }

    // Update the year and month display
    yearSelect.value = selectedYear; // Set select element value
    monthSelect.value = selectedMonth; // Set select element value
    selectedDate.textContent = `${months[selectedMonth]} ${selectedYear}`;
}
// Function to display the detail page
function displayDetailPage(date, selectedTime) {
    // Store the selected date and time
    sessionStorage.setItem('selectedDate', date);
    sessionStorage.setItem('selectedTime', time);
}

// Add a click event listener to the days table
daysTable.addEventListener('click', (event) => {
    // Check if the clicked element is a day cell
    if (event.target.tagName === 'TD') {
        // Get the selected date
        const date = new Date(selectedYear, selectedMonth, event.target.textContent);

        // Update the selected date display
        selectedDate.textContent = `${months[selectedMonth]} ${date.getDate()}, ${date.getFullYear()}`;

        // Clear the existing timing slots
        timingSlots.innerHTML = '';

        // Add the timing slots
        const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
        times.forEach((time) => {
            const slot = document.createElement('div');
            slot.className = 'timing-slot';
            slot.textContent = time;
            slot.addEventListener('click', () => {
                // Handle the user selecting a timing slot
                const selectedTime = slot.textContent;
                // Display the detail page
                displayDetailPage(date, selectedTime);
            });
            timingSlots.appendChild(slot);
        });
    }
});

// Add a click event listener to the next button
nextButton.addEventListener('click', () => {
    window.location.href = 'detail.html'; // Redirect to detail.html
});


