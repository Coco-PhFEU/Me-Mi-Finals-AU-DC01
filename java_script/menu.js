//Only executes after the menu page has loaded in
document.addEventListener("DOMContentLoaded", () => {

    //Finds all the food card with the class "food-card and stores it in foodCards variable"
    const foodCards = document.querySelectorAll(".food-card");

    //Stores all of the element of the food-card in a unique variable and moves on to the next food-card until all elements are categorized
    foodCards.forEach(card => {
        const plusBtn = card.querySelector(".plus-btn");
        const minusBtn = card.querySelector(".minus-btn");
        const quantityDisplay = card.querySelector(".quantity");
        const orderQuantity = card.querySelector(".order-quantity");
        const subtotalDisplay = card.querySelector(".subtotal");
        const addCartBtn = card.querySelector(".add-cart-btn");
        const price = Number(card.dataset.priced); //converts text into a number
        const name = card.dataset.name;
        const image = card.dataset.image;

        //Avoids the situation where the customer orders a 0 qty food
        let quantity = 1;

        //This func updates the qty of food including the number between the qty button, order qty, and the subtotal price of qty*price
        function updateCard(){
            quantityDisplay.textContent = quantity;
            orderQuantity.textContent = quantity;
            //subtotal is calculated and shortened to two decimal places
            subtotalDisplay.textContent = "₱" + (price * quantity).toFixed(2); 
        }

        //31-40 Executes both of these function after pressing the '+' or '-' to update the card
        plusBtn.addEventListener("click", () => {
            quantity++;
            updateCard();
        });
        minusBtn.addEventListener("click", () => {
            if(quantity > 1){
                quantity--;
                updateCard();
            }
        });

        addCartBtn.addEventListener("click", () => { //executes after pressing add to card button

            /*Initialize unqiue variable cart in order to get data from the menu page 
            and for later use to create the order item in the order page.Transforms the text-data
            into an object to create an order or add qty of an existing order. It signals
            the unqiue variable to accept the non-existing order yet to avoid crashing*/
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            //50-53 Finds an existing item if your adding more to an existing order
            const existingItem = cart.find(item => item.name === name);
            if(existingItem){
                existingItem.quantity += quantity;
            }
            //updates the card and pushes it onto the current order menu 
            else{
                cart.push({
                    name:name,
                    price:price,
                    quantity:quantity,
                    image:image
                });
            }
            //sends the object back to the browser as a text rather than object to store it in the local storage
            localStorage.setItem("cart", JSON.stringify(cart));
            //notifys the user that the menu item is successfully brough for order
            alert(name + " added to cart!");
        });
    });
});