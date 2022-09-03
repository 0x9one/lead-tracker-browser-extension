// Grap the save button element
const saveLead = document.getElementById('save-btn');
// Grap the delete button element
const deleteLead = document.getElementById('delete-btn');
// Grap The input element
const inputEL = document.getElementById('input-el');
// Grap the unordered list element
const urlList = document.getElementById('url-list'); 
// Create array to stock urls
let myLeads = []; 
// Get items from localStorage 
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

// Check and render our url list
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

// Create double click event 
deleteLead.addEventListener('dblclick', function () {
    // Clear localStorage
    localStorage.clear();
    // Clear URLs array
    myLeads = [];
    // Clear DOM list
    renderLeads();
});

// Add click listen to save button
saveLead.addEventListener('click', function () {
    // When save clicks push value to the myLeads array
    myLeads.push(inputEL.value);
    inputEL.value = '';
    // Svae urls to localStorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
});

// Create renderLead function to list our URLs
function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        // Using Template string to make code more clean
        listItems += 
            `<li>
                <a href="${myLeads[i]}" target="_blank">
                    ${myLeads[i]}
                </a>
            </li>`;
    }
    urlList.innerHTML = listItems;
}