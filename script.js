const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const heading = document.querySelector('h1');


function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }

    //Create Item DOM element
    addItemToDOM(newItem);

    //Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function addItemToDOM (item){
     //Create List Item

     const li = document.createElement('li');
     li.appendChild(document.createTextNode(item));
 
     const button = createButton('remove-item btn-link text-red');
 
     li.appendChild(button);
     
     // add li to dom
     itemList.appendChild(li);
}

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Add new Item to array
    itemsFromStorage.push(item);

    //Convert back to string so we can put in local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Create Button
function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    return button;
}

// Create Clear Icon
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Remove Items
function removeItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    } 
}

// Clear List
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

// Remove some UI elements when there is no list
function checkUI(){
    const items = itemList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Filter function

function filterItems (e){
    const liElements = itemList.querySelectorAll('li');
    if (e.target.value != null ){
    liElements.forEach(li => li.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? li.style.display = 'flex'  : li.style.display = 'none' );
} else {
    liElements.forEach(li => li.style.display = 'flex');
}
}

// Display Items from Local Storage

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

// Initialize App - to not show them on global scope

function init(){
//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}

init();
