// Menu data loaded from menu.json
let MENU_ITEMS = [];
let filteredItems = [];
let currentIndex = 0;

const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

// Load menu JSON
async function loadMenu() {
    try {
        const response = await fetch("menu.json");

        if (!response.ok) {
            throw new Error("Unable to load menu data.");
        }

        MENU_ITEMS = await response.json();
        filteredItems = MENU_ITEMS;

        console.log("Menu items:", MENU_ITEMS);

        displayMenuItem();

    } catch (error) {
        const message = document.getElementById("menu-message");

        if (message) {
            const alert = document.createElement("div");

            alert.className = "alert alert-danger";
            alert.textContent = "The underground menu could not be loaded.";

            message.appendChild(alert);
        }

        console.error(error);
    }
}

function displayMenuItem() {
    const image = document.getElementById("menu-image");
    const name = document.getElementById("menu-name");
    const description = document.getElementById("menu-description");
    const price = document.getElementById("menu-price");
    const category = document.getElementById("menu-category");
    const counter = document.getElementById("menu-counter");

    if (!image || !name || !description || !price || !category) {
        return;
    }

    if (filteredItems.length === 0) {
        name.textContent = "No Items Found";
        description.textContent = "There are no menu items in this category.";
        price.textContent = "";
        category.textContent = "";

        if (counter) {
            counter.textContent = "";
        }

        return;
    }

    const item = filteredItems[currentIndex];

    image.src = item.img;
    image.alt = item.name;

    name.textContent = item.name;
    description.textContent = item.description;
    price.textContent = money.format(item.price);
    category.textContent = item.category;

    if (counter) {
        counter.textContent =
            `${currentIndex + 1} of ${filteredItems.length}`;
    }
}

function prevImage() {
    if (filteredItems.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = filteredItems.length - 1;
    }

    displayMenuItem();
}

function nextImage() {
    if (filteredItems.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
    }

    displayMenuItem();
}

function filterMenu() {
    const filter = document.getElementById("category-filter");

    if (!filter) {
        return;
    }

    const selectedCategory = filter.value;

    if (selectedCategory === "All") {
        filteredItems = MENU_ITEMS;
    } else {
        filteredItems = MENU_ITEMS.filter(function(item) {
            return item.category === selectedCategory;
        });
    }

    currentIndex = 0;
    displayMenuItem();
}

function setupMenu() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const categoryFilter = document.getElementById("category-filter");

    if (!prevButton || !nextButton || !categoryFilter) {
        return;
    }

    prevButton.addEventListener("click", prevImage);
    nextButton.addEventListener("click", nextImage);
    categoryFilter.addEventListener("change", filterMenu);

    loadMenu();
}

function updateCharacterCounter() {
    const notes = document.getElementById("dietary-notes");
    const counter = document.getElementById("character-counter");

    if (!notes || !counter) {
        return;
    }

    const currentLength = notes.value.length;
    counter.textContent = `${currentLength}/30 characters`;
}

function setupReservationForm() {
    const form = document.getElementById("reservation-form");

    if (!form) {
        return;
    }

    const dietaryNotes = document.getElementById("dietary-notes");

    if (dietaryNotes) {
        dietaryNotes.addEventListener("input", updateCharacterCounter);
        updateCharacterCounter();
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const messageContainer =
            document.getElementById("reservation-message");

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const partySize =
            document.getElementById("party-size").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const dietaryNotes =
            document.getElementById("dietary-notes").value.trim();

        const newsletter =
            document.getElementById("newsletter").checked;

        const seating =
            document.querySelector('input[name="seating"]:checked');

        const errors = [];

        if (name === "") {
            errors.push("Name is required.");
        } else if (name.length > 20) {
            errors.push("Name must be 20 characters or fewer.");
        }

        if (email === "") {
            errors.push("Email is required.");
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                errors.push("Please enter a valid email address.");
            }
        }

        if (partySize === "") {
            errors.push("Please select a party size.");
        } else {
            const partyNumber = Number(partySize);

            if (partyNumber < 1 || partyNumber > 8) {
                errors.push("Party size must be between 1 and 8.");
            }
        }

        if (date === "") {
            errors.push("Date is required.");
        }

        if (time === "") {
            errors.push("Time is required.");
        }

        if (!seating) {
            errors.push("Please select a seating preference.");
        }

        if (dietaryNotes.length > 30) {
            errors.push("Dietary notes must be 30 characters or fewer.");
        }

        if (errors.length > 0) {
            const alert = document.createElement("div");

            alert.className = "alert alert-danger";
            alert.setAttribute("role", "alert");

            const heading = document.createElement("strong");
            heading.textContent = "Please fix the following:";

            alert.appendChild(heading);

            const errorList = document.createElement("ul");
            errorList.className = "mb-0 mt-2";

            errors.forEach(function(error) {
                const listItem = document.createElement("li");

                listItem.textContent = error;
                errorList.appendChild(listItem);
            });

            alert.appendChild(errorList);

            messageContainer.innerHTML = "";
            messageContainer.appendChild(alert);

            return;
        }

        const reservation = {
            name: name,
            email: email,
            partySize: Number(partySize),
            date: date,
            time: time,
            seating: seating.value,
            dietaryNotes: dietaryNotes,
            newsletter: newsletter
        };

        console.log("Reservation JSON:", JSON.stringify(reservation));

        const successAlert = document.createElement("div");

        successAlert.className = "alert alert-success";
        successAlert.setAttribute("role", "alert");

        successAlert.textContent =
            "Reservation request submitted successfully! We will review your request and contact you by email.";

        messageContainer.innerHTML = "";
        messageContainer.appendChild(successAlert);
    });

    form.addEventListener("reset", function() {
        const messageContainer =
            document.getElementById("reservation-message");

        messageContainer.innerHTML = "";

        setTimeout(function() {
            updateCharacterCounter();
        }, 0);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupMenu();
    setupReservationForm();
});