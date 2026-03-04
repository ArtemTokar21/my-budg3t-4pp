// Change this line inside your forEach loop:
row.innerHTML = `
    <span>${item.description}</span>
    <span>$${item.amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="removeItem(${item.id})">Delete</button>

`;
