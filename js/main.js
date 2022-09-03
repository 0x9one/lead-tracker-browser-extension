// Grap the save input button element
const saveLead = document.getElementById('save-btn');
// Grap the save tab button element
const saveTab = document.getElementById('save-tab');
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
    render(myLeads);
}

// Add click listen to save tab button
saveTab.addEventListener('click', function () {
    // Talk with chrome API to ask make a query in the current window and tab to fetch the URL
        // Then store in our url list, localstorage too and display it
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

// Create double click event 
deleteLead.addEventListener('dblclick', function () {
    // Clear localStorage
    localStorage.clear();
    // Clear URLs array
    myLeads = [];
    // Clear DOM list
    render(myLeads);
});

// Add click listen to save button
saveLead.addEventListener('click', function () {
    // When save clicks push value to the myLeads array
    myLeads.push(inputEL.value);
    inputEL.value = '';
    // Svae urls to localStorage 
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

// Create render function to list our URLs
function render(_leads) {
    let listItems = "";
    for (let i = 0; i < _leads.length; i++) {
        // Using Template string to make code more clean
        listItems += 
            `<li>
                <a href="${_leads[i]}" target="_blank">
                    ${_leads[i]}
                </a>
            </li>`;
    }
    urlList.innerHTML = listItems;
}