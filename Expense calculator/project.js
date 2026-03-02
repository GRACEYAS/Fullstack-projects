var isEdit = false;
var currentEntry = null;

var entries = JSON.parse(localStorage.getItem("expenses"));
if (!Array.isArray(entries)) {
    entries = [];
}


function addEntry() {

    var desc = document.getElementById("desc").value;
    var amt = document.getElementById("amt").value;
    var typeEl = document.querySelector('input[name="type"]:checked');

    if (!desc || !amt || !typeEl) {
        alert("All fields are required");
        return;
    }

    var entryData = {
        id: Date.now(),
        description: desc,
        amount: Number(amt),
        type: typeEl.value
    };

    if (isEdit) {
        entries = entries.map(item =>
            item.id === currentEntry ? { ...entryData, id: currentEntry } : item
        );
        isEdit = false;
        currentEntry = null;
    } else {
        entries.push(entryData);
    }

    localStorage.setItem("expenses", JSON.stringify(entries));
    displayEntries();
    resetForm();
}

function displayEntries() {

    entries = JSON.parse(localStorage.getItem("expenses"));
    if (!Array.isArray(entries)) {
        entries = [];
    }

    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    var totalIncome = 0;
    var totalExpense = 0;

    entries.forEach(function (item) {

        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }

        var tr = document.createElement("tr");
        tr.className = "bg-white border-b hover:bg-gray-200";

        tr.innerHTML = `
            <td class="px-6 py-4">${item.description}</td>
            <td class="px-6 py-4">₹${item.amount}</td>
            <td class="px-6 py-4">${item.type}</td>
            <td class="px-6 py-4">
                <button onclick="editEntry(${item.id})" class="text-blue-600">Edit</button> |
                <button onclick="deleteEntry(${item.id})" class="text-red-600">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById("income").innerText = totalIncome;
    document.getElementById("expense").innerText = totalExpense;
    document.getElementById("balance").innerText = totalIncome - totalExpense;
}

function editEntry(id) {

    var item = entries.find(entry => entry.id === id);
    if (!item) return;

    document.getElementById("desc").value = item.description;
    document.getElementById("amt").value = item.amount;
    document.querySelector(`input[value="${item.type}"]`).checked = true;

    isEdit = true;
    currentEntry = id;
}

// ====== Delete Entry ======
function deleteEntry(id) {

    if (confirm("Are you sure you want to delete?")) {
        entries = entries.filter(item => item.id !== id);
        localStorage.setItem("expenses", JSON.stringify(entries));
        displayEntries();
    }
}


function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amt").value = "";
    document.querySelectorAll('input[name="type"]').forEach(el => el.checked = false);
}

window.onload = function () {
    displayEntries();
};