let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body'); 
const totalAmountCell = document.getElementById('total-amount');
totalAmountCell.textContent = "0"; 

const ctx = document.getElementById('expense-chart').getContext('2d');
let chart;


function updateChart() {
    
    const categoryTotals = expenses.reduce((totals, expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        return totals;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    
    if (chart) {
        chart.destroy();
    }

    
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expense Distribution',
                data: data,
                backgroundColor: ['#4CAF50', '#f44336', '#FF9800', '#2196F3', '#9C27B0'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}


addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate inputs
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    
    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);

        
        updateChart();
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    
    updateChart();
});


updateChart();