// Sample menu data from local businesses
import menuItemsData from'./menu-items.html';
const menuItems = menuItemsData;

function createMenuItem(item) {
    
    console.log("separate");
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const itemName = document.createElement("p");
    itemName.classList.add("title");
    itemName.textContent = item.title;

    const itemCharacteristics = document.createElement("p");
    itemCharacteristics.classList.add("characteristics");

    // Loop through characteristics and create a separate line for each
    item.characteristics.forEach(characteristic => {
        const characteristicLine = document.createElement("span");
        characteristicLine.textContent = characteristic;
        itemCharacteristics.appendChild(characteristicLine);
        itemCharacteristics.appendChild(document.createElement("br")); // Add line break
    });

    menuItem.appendChild(itemName);
    menuItem.appendChild(itemCharacteristics);
    return menuItem;
}

// Function to populate the physical menu with all menu items
function populatePhysicalMenu() {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });
}

// Function to filter and update the physical menu based on selected filters
function filterAndPopulatePhysicalMenu() {
    console.log("HELLOOOOOOO");
    const mealFilter = document.getElementById("meal-filter").value;
    const itemFilter = document.getElementById("item-filter").value;

    const filteredItems = menuItems.filter(item => {
        if (mealFilter !== "all" && item.category !== mealFilter) {
            return false;
        }
        console.log(item.characteristics);
        if (itemFilter !== "all" && !item.characteristics.includes(itemFilter)) {
            return false;
        }

        return true;
    });

    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    filteredItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });
}

// Event listeners for filter changes
document.getElementById("meal-filter").addEventListener("change", filterAndPopulatePhysicalMenu);
document.getElementById("item-filter").addEventListener("change", filterAndPopulatePhysicalMenu);

// Initial menu rendering (show all items)
populatePhysicalMenu();