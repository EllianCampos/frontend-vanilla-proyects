const saveTransactions = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const getTransactions = () => {
  return JSON.parse(localStorage.getItem("transactions")) || [];
};

const moneyFormat = (amount) => {
  const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: "CRC"
  }) 
  return formatter.format(amount)
}

const showBalance = () => {
  const balance = document.getElementById("balance");
  const transactions = getTransactions()

  const calculateBalance = (balanceAmount, transaction) => {
    if (transaction.type === "Retiro")
      return balanceAmount - parseFloat(transaction.amount);
    else if (transaction.type === "Ingreso")
      return balanceAmount + parseFloat(transaction.amount);
    else return balanceAmount;
  };

  const balanceAmount = transactions.reduce(calculateBalance, 0);
  balance.textContent = `${moneyFormat(balanceAmount)}`;
};

const showHistory = () => {
	const tbody = document.getElementById("tbody");
  const transactions = getTransactions()
  const transactionsOrdered = transactions.reverse();

  // Limpiar la tabla
  while (tbody.hasChildNodes()) tbody.removeChild(tbody.firstChild);

	// Crear las nuevas filas
  const rows = transactionsOrdered.map((transaction) => {
    return `
        <tr class=${
          transaction.type == "Retiro" ? "table-danger" : "table-light"
        }>
            <td>${transaction.type}</td>
            <td>${moneyFormat(transaction.amount)}</td>
        </tr>
    `;
  });

  tbody.innerHTML = rows.join("");
};

document.addEventListener("DOMContentLoaded", () => {
  showHistory();
  showBalance();
});

document.getElementById("formTransac").addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount");
  const type = document.getElementById("type");
  const alertbox = document.getElementById("alertbox");

  // Validar el campo de texto
  if (amount.value.trim() === "") {
    alertbox.classList.remove("d-none");
    alertbox.textContent = "Ingresa el monto";
    console.log("1");
    return;
  } else if (isNaN(amount.value.trim())) {
    alertbox.classList.remove("d-none");
    alertbox.textContent = "El monto debe ser númerico";
    console.log("2");
    return;
  }
  alertbox.classList.add("d-none");
  alertbox.textContent = "";

  // Obtener las transacciones existentes
  const transactions = getTransactions();

  // Añadir al final del array
  const newTransaction = { amount: amount.value, type: type.value };
  transactions.push(newTransaction);

  // Gurdar
	saveTransactions(transactions)
  formTransac.reset();
  showHistory();
  showBalance();
});