// Get the selected date and time from the session storage
const selectedDate = sessionStorage.getItem('selectedDate');
const selectedTime = sessionStorage.getItem('selectedTime');
const urlParams = newURLSearchParams(window.location.search);
const name = urlParams.get('name');

// Display the selected date and time
document.getElementById('selectedDate').textContent = selectedDate;
document.getElementById('selectedTime').textContent = selectedTime;
document.getElementById('name').innerText = name;

// Get the schedule event button
const scheduleEventButton = document.getElementById('scheduleevent');

// Add click event listener to the button
scheduleEventButton.addEventListener('click', redirectToScheduledPage);

// Function to redirect to scheduled.html
function redirectToScheduledPage() {
    window.location.href = "scheduled.html";
}
