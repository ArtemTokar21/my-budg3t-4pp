// Load data from browser cache on start
let items = JSON.parse(localStorage.getItem('budget_data')) || [];
render();

function addExpense() {
    const descInput = document.getElementById('desc');
    const amtInput = document.getElementById('amt');

    if (descInput.value && amtInput.value) {
        const newItem = {
            id: Date.now(),
            name: descInput.value,
            price: parseFloat(amtInput.value)
        };
        items.push(newItem);
        updateStorage();
        descInput.value = '';
        amtInput.value = '';
    }
}

function render() {
    const list = document.getElementById('expense-list');
    const totalDisplay = document.getElementById('total-val');
    list.innerHTML = '';
    let total = 0;

    items.forEach(item => {
        total += item.price;
        list.innerHTML += `
            <div class="expense-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)}</small>
                </div>
                <button class="del-btn" onclick="deleteItem(${item.id})">×</button>
            </div>
        `;
    });
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('budget_data', JSON.stringify(items));
    render();
}

function clearAll() {
    if(confirm("Delete everything?")) {
        items = [];
        updateStorage();
    }
}

function downloadBackup() {
    const blob = new Blob([JSON.stringify(items, null, 2)], {type : 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget_backup.json';
    a.click();
}
