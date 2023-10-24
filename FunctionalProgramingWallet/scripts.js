const formTransac = document.getElementById('formTransac')
const tbody = document.getElementById('tbody')

formTransac.addEventListener('submit',(e) => {
    e.preventDefault()
    addTransaction()
})

const addTransaction = () => {
    const amount = document.getElementById('amount').value
    const type = document.getElementById('type').value

    const transactions = JSON.parse(localStorage.getItem('transactions')) || []

    // Añadir al final del array
    const newTransaction = { amount, type}
    transactions.push(newTransaction)

    // Gurdar 
    localStorage.setItem("transactions", JSON.stringify(transactions))
    formTransac.reset()
    showHistory()
    showBalance()
}

const showBalance = () => {
    const balance = document.getElementById('balance');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const calculateBalance = (balanceAmount, transaction) => {
        if (transaction.type === 'Retiro')
            return balanceAmount - parseFloat(transaction.amount);
        else if (transaction.type === 'Ingreso') 
            return balanceAmount + parseFloat(transaction.amount);
        else
            return balanceAmount;
    };

    const balanceAmount = transactions.reduce(calculateBalance, 0);
    balance.textContent = `₡${balanceAmount}`;
}

const showHistory = () => {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || []
    const transactionsOrdered = transactions.reverse()

    // Limpiar la tabla   
    while(tbody.hasChildNodes())
	    tbody.removeChild(tbody.firstChild);
    
    for (const transaction of transactions) {
        tbody.innerHTML += `
            <tr class="${transaction.type=="Retiro"? "table-danger":"table-light"}">
                <td>${transaction.type}</td>
                <td>${transaction.amount}</td>
            </tr>
        `
    }
}

showHistory()
showBalance()