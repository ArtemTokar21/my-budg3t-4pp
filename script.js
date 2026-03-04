// Change this line inside your forEach loop:
row.innerHTML = `
    <span>${item.description}</span>
    <span>$${item.amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="removeItem(${item.id})">Delete</button>

`;
function downloadBackup() {
    // 1. Check if there is actually data to save
    if (budgetItems.length === 0) {
        alert("No data to download!");
        return;
    }

    // 2. Convert the array into a pretty-printed JSON string
    const dataStr = JSON.stringify(budgetItems, null, 2);
    
    // 3. Create a "Blob" (Binary Large Object) which acts like a file in memory
    const blob = new Blob([dataStr], { type: "application/json" });
    
    // 4. Create a temporary URL for that blob
    const url = URL.createObjectURL(blob);
    
    // 5. Create a hidden <a> tag, click it, and then remove it
    const link = document.createElement("a");
    link.href = url;
    link.download = `budget_backup_${new Date().toISOString().slice(0,10)}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL memory
    URL.revokeObjectURL(url);
}
