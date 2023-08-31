// index.js

console.log("Script loaded.");

const openButton = document.getElementById('openButton');
const modal = document.getElementById('myModal');
const modalForm = document.getElementById('modalForm');
const cardContainer = document.getElementById('taskCard');
const storedId = [];
let currentField = 'parentTaskId';

openButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.getElementById(currentField).focus();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        modalForm.reset();
        currentField = 'parentTaskId';
    }
});

function validateParentTaskId() {
    const parentTaskIdInput = document.getElementById('parentTaskId');
    const parentTaskId = parseInt(parentTaskIdInput.value);

    if (isNaN(parentTaskId) || storedId.includes(parentTaskId)) {
        parentTaskIdInput.setCustomValidity('Please enter a valid and unique Parent Task ID.');
    } else {
        parentTaskIdInput.setCustomValidity('');
    }
}

function validateDateRange() {
    const parentTaskEndDateInput = document.getElementById('parentTaskEndDate');
    const parentTaskStartDateInput = document.getElementById('parentTaskStartDate');
    const parentTaskEndDate = new Date(parentTaskEndDateInput.value);
    const parentTaskStartDate = new Date(parentTaskStartDateInput.value);

    if (parentTaskEndDate <= parentTaskStartDate) {
        parentTaskEndDateInput.setCustomValidity('End Date must be later than Start Date.');
    } else {
        parentTaskEndDateInput.setCustomValidity('');
    }
}

modalForm.addEventListener('change', function (event) {
    if (event.target.id === 'parentTaskId') {
        currentField = 'parentTaskId';
        validateParentTaskId();
    } else if (event.target.id === 'parentTaskStartDate' || event.target.id === 'parentTaskEndDate') {
        currentField = event.target.id;
        validateDateRange();
    }
});

modalForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (currentField === 'parentTaskId') {
        validateParentTaskId();
    } else if (currentField === 'parentTaskStartDate' || currentField === 'parentTaskEndDate') {
        validateDateRange();
    }

    if (modalForm.checkValidity()) {
        const parentTaskId = parseInt(document.getElementById('parentTaskId').value);
        const parentTaskName = document.getElementById('parentTaskName').value;
        const parentTaskStartDate = document.getElementById('parentTaskStartDate').value;
        const parentTaskEndDate = document.getElementById('parentTaskEndDate').value;
        const parentTaskStatus = document.getElementById('parentTaskStatus').value;

        storedId.push(parentTaskId);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3><span>${parentTaskId} </span><span>${parentTaskName} </span></h3>
            <p>Start Date: ${parentTaskStartDate}</p>
            <p>End Date: ${parentTaskEndDate}</p>
            <p>Status: ${parentTaskStatus}</p>
        `;

        cardContainer.appendChild(card);

        modalForm.reset();
        modal.style.display = 'none';
    } else {
        document.getElementById(currentField).focus();
    }
});
