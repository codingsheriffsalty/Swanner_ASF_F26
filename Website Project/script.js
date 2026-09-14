
const MENU_ITEMS = [

    {
        id: 1,
        name: "The Rebel Brownie",
        description: "Dark chocolate brownie with chocolate chips.",
        price: 6.00,
        category: "Breakfast"
    },

    {
        id: 2,
        name: "The Freedom Bar",
        description: "Dark chocolate, caramel, and sea salt.",
        price: 5.00,
        category: "Breakfast"
    },

    {
        id: 3,
        name: "The Organizer",
        description: "Spicy dark chocolate with cinnamon.",
        price: 6.50,
        category: "Lunch"
    },

    {
        id: 4,
        name: "The Night Shift",
        description: "Warm chocolate cake with chocolate sauce.",
        price: 7.00,
        category: "Lunch"
    },

    {
        id: 5,
        name: "The Resistance",
        description: "Dark chocolate cake with espresso frosting.",
        price: 7.50,
        category: "Lunch"
    },

    {
        id: 6,
        name: "The Underground",
        description: "Chocolate mousse with dark chocolate shavings.",
        price: 6.50,
        category: "Dinner"
    },

    {
        id: 7,
        name: "The Last Secret",
        description: "Hot chocolate with whipped cream and cocoa.",
        price: 5.50,
        category: "Dinner"
    },

    {
        id: 8,
        name: "The Freedom Cake",
        description: "Rich chocolate cake with vanilla cream.",
        price: 8.00,
        category: "Dinner"
    },

    {
        id: 9,
        name: "The Hidden Truffle",
        description: "Hand-rolled dark chocolate truffles.",
        price: 7.25,
        category: "Breakfast"
    },

    {
        id: 10,
        name: "The Rebel Shake",
        description: "Cold chocolate shake with whipped cream.",
        price: 6.75,
        category: "Lunch"
    },

    {
        id: 11,
        name: "The Secret Sundae",
        description: "Chocolate ice cream with chocolate sauce and shavings.",
        price: 7.50,
        category: "Dinner"
    },

    {
        id: 12,
        name: "The Underground Mocha",
        description: "Hot espresso with rich chocolate and steamed milk.",
        price: 5.75,
        category: "Breakfast"
    }

];



// PRICE FORMATTER

const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});


// RENDER MENU

function renderMenu() {

    const menuContainer = document.getElementById("menu-items");

    if (!menuContainer) {
        return;
    }

    menuContainer.innerHTML = "";

    MENU_ITEMS.forEach(function(item) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = item.description;

        const priceCell = document.createElement("td");
        priceCell.textContent = money.format(item.price);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = item.category;

        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(priceCell);
        row.appendChild(categoryCell);

        menuContainer.appendChild(row);

    });

}


// RESERVATION FORM

function setupReservationForm() {

    const form = document.getElementById("reservation-form");

    if (!form) {
        return;
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
            document.querySelector(
                'input[name="seating"]:checked'
            );



        const errors = [];


        if (name === "") {

            errors.push("Please enter your name.");

        } else if (name.length > 20) {

            errors.push("Name must be 20 characters or fewer.");

        }


        if (email === "") {

            errors.push("Please enter your email.");

        } else if (!email.includes("@") || !email.includes(".")) {

            errors.push("Please enter a valid email address.");

        }


        if (partySize === "") {

            errors.push("Please select a party size.");

        }


        if (date === "") {

            errors.push("Please select a date.");

        }


        if (time === "") {

            errors.push("Please select a time.");

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


        console.log(reservation);



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

    });

}



document.addEventListener("DOMContentLoaded", function() {

    renderMenu();

    setupReservationForm();

});