//js only executes if order page ahs loaded
document.addEventListener("DOMContentLoaded", () => {

    //finds the elements of the ids and remembers their references
    const orderItems = document.getElementById("order-items");
    const totalItems = document.getElementById("total-items");
    const grandTotal = document.getElementById("grand-total");

    //recieve any saved cart array from the browser and update the unique cart variable
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //saves any update from the qty element whether to be increased,decrease, or remove if it's called
    function saveCart(){
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    //innerHTML is built-in, inserts the multi line elements to the html file
    //textContent is built-in, changes the text only in a element
    //20-32 if no saved cart item from menu, show an empty order
    function displayCart(){
        orderItems.innerHTML = "";
        if(cart.length === 0){
            orderItems.innerHTML = `
                <div class="empty-cart">
                <h2>Your cart is empty.</h2>
                <p>Add some delicious Bánh Mì first!</p>
                </div>
            `;
            totalItems.textContent = "0";
            grandTotal.textContent = "₱0.00";
            return;
        }

        //if cart is not empty, initializes total qty & total price and updates real time
        let totalQuantity = 0;
        let totalPrice = 0;

        //For loops all of the saved cart object and store their order information and their index
        cart.forEach((item,index)=>{
            totalQuantity += item.quantity; //calculates the current and incoming qty
            totalPrice += item.price * item.quantity; //calculates the current and increasing price
            //insert multi line elements in the orderItems element in HTML 
            // All of the updated information can be seen in the Order Pages with the template literals below
            orderItems.innerHTML += `
                <div class="order-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-info">
                        <h2>${item.name}</h2>
                        <p class="order-price">
                            ₱${item.price.toFixed(2)}
                        </p>
                        <div class="order-quantity">
                            <button class="decrease" data-index="${index}">−</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-index="${index}">+</button>
                        </div>
                        <p class="order-subtotal">
                            Subtotal:
                            ₱${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            class="remove-btn"
                            data-index="${index}">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        });
        //updates the order summary which is equal to the qty and subtotal price/s of the carts
        totalItems.textContent = totalQuantity;
        grandTotal.textContent =
            "₱" + totalPrice.toFixed(2); //Decimal places is set to two places.
            //waits for the card carts to initialize first before adding the button function for functionality
        buttonEvents();
    }

    //function for all the increase qty,decrease qty,delete cart object
    function buttonEvents(){

        //references the increase button and activates after being clicked
        document.querySelectorAll(".increase").forEach(btn=>{
            //since saved order items are sorted in the array starting from index 0,
            //87 increase the qty of the order item respective to its increased button
            //88-89 it saves the changes and displays the updated information.
            btn.addEventListener("click", ()=>{
                cart[btn.dataset.index].quantity++;
                saveCart();
                displayCart();
            });
        });
        //references the decrease button and activates after being clicked
        document.querySelectorAll(".decrease").forEach(btn=>{
            //since saved order items are sorted in the array starting from index 0,
            //100 increase the qty of the order item respective to its decreased button
            //99 stops users to go below than 1 qty
            //102-103 it saves the changes and displays the updated information.
            btn.addEventListener("click", ()=>{
                if(cart[btn.dataset.index].quantity>1){
                    cart[btn.dataset.index].quantity--;
                }
                saveCart();
                displayCart();
            });
        });
        //references the delete button and activates after being clicked
        document.querySelectorAll(".remove-btn").forEach(btn=>{
            //on click, the splice method will remove 1 element from an array starting at a given index
            //given the index of a order item, the remove button will remove the respective order item from the cart array.
            //113-114 it saves the changes and displays the updated information.
           btn.addEventListener("click", ()=>{
                cart.splice(btn.dataset.index,1);
                saveCart();
                displayCart();
            });
        });
    }
    //executes the function as js define the purpose of the function first
    displayCart();
});