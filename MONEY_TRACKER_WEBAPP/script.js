let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const printBtn = document.getElementById('generate-pdf-btn');

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

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

    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const rowIndex = expenses.indexOf(expense);
        if (rowIndex > -1) {
            expenses.splice(rowIndex, 1);
        }

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expenseTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);
});

clearBtn.addEventListener('click', function () {
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});

printBtn.addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Expense Tracker', 15, 15);

    const tableData = expenses.map(expense => [expense.category, expense.amount, expense.date]);

    doc.autoTable({
        startY: 25,
        head: [['Category', 'Amount', 'Date']],
        body: tableData
    });

    doc.text(`Total Amount: ${totalAmount}`, 15, doc.autoTable.previous.finalY + 10);

    doc.save('expenses.pdf');
});

printBtn.style.display = 'block';
printBtn.style.margin = '20px auto';
