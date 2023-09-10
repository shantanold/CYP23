document.addEventListener("DOMContentLoaded", function () {
    // Your code here
});
let menuItemsData = [];

        // Function to save data to localStorage
        function saveMenuItemsToLocalStorage() {
            localStorage.setItem("menuItems", JSON.stringify(menuItemsData));
            }

        function loadMenuItemsFromLocalStorage() {
            const storedData = localStorage.getItem("menuItems");
            if (storedData) {
                menuItemsData = JSON.parse(storedData);
            }
}

        function removeMenuItemById(itemId) {
        menuItemsData = menuItemsData.filter(item => item.id !== itemId);
         // After removing an item, save the updated data to local storage
        saveMenuItemsToLocalStorage();
}

        const addButton= document.getElementById("add-item-button");
        const formContainer = document.querySelector('.formContainer');
        if(addButton){
            addButton.addEventListener("click", () => {
                // Toggle the visibility of the form
                //console.log("cooking with fire");
                    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
                         formContainer.style.display = 'flex'; // Change 'flex' to 'block' for better visibility
                      } else {
                         formContainer.style.display = 'none';
                    }
            });
        }
        

        // Function to populate form fields with data
        function populateFormFields() {
            const item = menuItemsData[menuItemsData.length - 1]; // Get the last submitted item
            if (item) {
                if(document.getElementById("item_name")){
                    document.getElementById("item_name").value = item.title;
                }
                if(document.getElementById("mealCategory")){
                    document.getElementById("mealCategory").value = item.category;
                }
                
            }

            // Update checkboxes based on item characteristics
            const itemCharacteristics = [
                "vegetarian", "halal", "gluten-free", "meat",
                "vegan", "lactose-free", "nut-free", "pescatarian", "koscher", "low-carb"
            ];

            itemCharacteristics.forEach(char => {
                const checkbox = document.querySelector(`input[name="${char}"]`);
                if(checkbox){
                    checkbox.checked = item[char] === char;
                }
                
            });

        }

        // Function to display menu items
        function displayMenuItems() {
        const menuGrid = document.getElementById("menu-grid");
        if(menuGrid){
            menuGrid.innerHTML = "";
            menuItemsData.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.className = "menu-item";
    
                const itemTitle = document.createElement("h2");
                itemTitle.textContent = item.title;
    
                const itemCategory = document.createElement("p");
                itemCategory.textContent = `Category: ${item.category}`;
    
                const itemVendor =document.createElement("p");
                itemVendor.textContent = `Vendor: Greasy Grove`;
    
                const itemCharacteristics = document.createElement("p");
                
                itemCharacteristics.textContent = `Characteristics: ${item.characteristics}`;
    
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Delete";
    
                menuItem.appendChild(itemTitle);
                menuItem.appendChild(itemVendor);
                menuItem.appendChild(itemCategory);
            
                menuItem.appendChild(itemCharacteristics); // Add characteristics to the item display
                menuItem.appendChild(deleteButton);
    
                menuGrid.appendChild(menuItem);
    
                // Add event listener for delete button
                deleteButton.addEventListener("click", () => {
                    // Get the item's ID (assuming it's stored as a data attribute)
                    const itemId = item.id;
    
                    // Ask for confirmation before deleting
                    const confirmation = confirm("Are you sure you want to delete this menu item?");
                    
                    if (confirmation) {
                        // Remove the item from the menuItemsData array
                        removeMenuItemById(itemId);
    
                        // Refresh the display
                        displayMenuItems();
                    }
                });
            });


        }
        

        
}
        

        // Event listener for the "Add Item" button outside the form
        if(document.getElementById('add-item-button')){
            document.getElementById("add-item-button").addEventListener("click", () => {
                // Implement logic to add a new item (not shown in this example)
    
                // Then, refresh the displayMenuItems function
                displayMenuItems();
            });
        }
        

        // Event listener for the form submit event
        if(document.getElementById("myForm")){
            document.getElementById("myForm").addEventListener("submit", event => {
                event.preventDefault();
    
                // Retrieve values entered in the form fields
                const itemName = document.getElementById("item_name").value;
                const mealCategory = document.getElementById("mealCategory").value;
                const selectedCharacteristics = [];
                const checkboxes = document.querySelectorAll('input[name="characteristics"]:checked');
                checkboxes.forEach(checkbox => {
                selectedCharacteristics.push(checkbox.value);
            });
                // Create a new menu item object
                const newItem = {
                    id: menuItemsData.length + 1,
                    title: itemName,
                    category: mealCategory,
                    characteristics: selectedCharacteristics.join(", "),
                };
                //(newItem);
                // Push the new item into the menuItemsData array
                menuItemsData.push(newItem);
    
                // Save data to localStorage
                saveMenuItemsToLocalStorage();
                window.postMessage({ type: 'updateMenuItems', data: menuItemsData }, '*');
                localStorage.setItem("menuItemsForFirstPage", JSON.stringify(menuItemsData));
    
                // Clear the form fields
                document.getElementById("item_name").value = "";
                document.getElementById("mealCategory").value = "";
    
                // Refresh the displayed menu items
                displayMenuItems();
            });
        }
        

        // Initial load of data from localStorage
        loadMenuItemsFromLocalStorage();
        displayMenuItems();
        // Populate form fields with the last submitted item (if any)
        populateFormFields();

        // Initial display of menu items
        displayMenuItems();
        export default menuItemsData;