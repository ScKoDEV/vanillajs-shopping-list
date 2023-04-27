const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const heading = document.querySelector('h1');


function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate Input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }

    //Create List Item

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');

    li.appendChild(button);
    
    // add li to dom
    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';
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


//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();