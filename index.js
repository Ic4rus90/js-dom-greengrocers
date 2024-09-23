const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "fruit",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "fruit",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      type: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "berry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "fruit",
      price: 0.35
    }
  ],
  cart: [],
  filters: [
    {
      id: 1,
      name: 'fruit'
    },
    {
      id: 2, 
      name: 'vegetable'
    },
    {
      id: 3,
      name: 'berry'
    }
  ]
};

const filterList = document.querySelector('.store--filter-list');

function renderStoreFilterButtons() {

  state.filters.forEach((filter) => {
  
    const li = document.createElement('li');

    const button = document.createElement('button');
    button.textContent = `${filter.name}`;

    li.appendChild(button);
    
    button.addEventListener('click', () => {
      setActiveFilter(filter);
    });

    filterList.appendChild(li);
  }
)};

let activeFilter = ''

function setActiveFilter(filter) {
  console.log('filter button clicked')
  if (activeFilter === filter.name) {
    activeFilter = '';
  } else {
    activeFilter = filter.name;
  }

  renderStoreItems();
}

/*
Select the store item list element (ul). 
.store--item-list is used as this is more specific than .item-list, 
which is the other class in the index.html for the store. 
*/
const storeItemList = document.querySelector('.store--item-list');

// Function to render store items
function renderStoreItems() {
  // Clear all existing items
  storeItemList.innerHTML = '';

  // Loop through each item in the state.items array
  state.items.forEach((item) => {



    if (activeFilter !== '' && item.type !== activeFilter) {
      return
    }

    /*
    Create the elements based on the store item template.
    li stands for list item.
    */ 
    const li = document.createElement('li');

    // Create a <div> to hold fit the item icon. 
    const divIcon = document.createElement('div');
    
    // Set the class to 'store--item-icon for styling.
    divIcon.className = 'store--item-icon';

    // Create <img> element to display the item's image.
    const img = document.createElement('img');
    // Set the source of the image to the file path of the item's icon
    img.src = `assets/icons/${item.id}.svg`;
    // Sets the alternative text for the image. 
    img.alt = item.name;

    // Create a <button> element with the text 'Add to cart'
    const button = document.createElement('button');
    button.textContent = 'Add to cart';

    // Appendchild -> Adds child node to parent note.

    // Add the <img> element inside the div element. 
    divIcon.appendChild(img);
    // Adds the div containing the icon to the list item.
    li.appendChild(divIcon);
    // Add the button to the list item.
    li.appendChild(button);

    /*
    This operation provides the following html: 
    <li>
      <div class="store--item-icon">
        <img src="..." alt="..." />
      </div>
      <button>Add to cart</button>
    </li>
    */

    /*
      Add event listener to the button.
      The event is set to 'click', 
      triggering the function addItemToCart when the button is clicked.

    */
    button.addEventListener('click', () => {
      addItemToCart(item);
    });


    /* 
      Add the <li> we've been creating to the <ul> element in the HTML.
      This makes it visible on the page. 
    */
    storeItemList.appendChild(li);
  });
}



/*
Helper function to add an item to the cart, when the button above is clicked.
*/

function addItemToCart(item) {
  // Check if the item is already in the cart
  const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);

  // If the item exists in the cart already, then increase the quantity. 
  if (cartItem) {
    cartItem.quantity += 1;
  } 
  // If the item is not in the cart, add it to the cart with quantity 1
  else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }

  // Re-render the cart to show the updated cart
  renderCartItems();

  // Update the total price
  updateTotalPrice();
}

// Select the cart item list element
const cartItemList = document.querySelector('.cart--item-list');

function renderCartItems() {
  /* 
    Clear the cart item list before rendering.
    This is done to remove any existing items before re-rendering.
  */
  cartItemList.innerHTML = '';

  // Loop through each item in the state.cart array
  state.cart.forEach((item) => {
    // Create the elements based on the cart item template
    const li = document.createElement('li');

    // Create image element
    const img = document.createElement('img');
    /*
    Following the template for the image
    */
    img.className = 'cart--item-icon';
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;

    // Create p element
    const p = document.createElement('p');
    // Display the item name
    p.textContent = item.name;

    /*
      Create button to decrease item's quantity.
      Follows the template.
    */
    const minusButton = document.createElement('button');
    minusButton.className = 'quantity-btn remove-btn center';
    minusButton.textContent = '-';

    /*
      Create a span to display the current quantity of the item.
      Follows the template.
    */
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity-text center';
    quantitySpan.textContent = item.quantity;

    /*
      Create a button to increase the item's quantity.
      Follows the template.
    */
    const plusButton = document.createElement('button');
    plusButton.className = 'quantity-btn add-btn center';
    plusButton.textContent = '+';

    // Append all of the elements to the list item. 
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(minusButton);
    li.appendChild(quantitySpan);
    li.appendChild(plusButton);

    // Add event listeners to the buttons
    minusButton.addEventListener('click', () => {
      decreaseQuantity(item);
    });

    plusButton.addEventListener('click', () => {
      increaseQuantity(item);
    });

    // Append the list item to the cart item list
    cartItemList.appendChild(li);
  });
}


function increaseQuantity(item) {
  // Increase the item's quantity
  item.quantity += 1;

  // Re-render the cart and update the total price
  renderCartItems();
  updateTotalPrice();
}

function decreaseQuantity(item) {
  // Decrease the item's quantity
  item.quantity -= 1;

  // If quantity is zero, remove the item from the cart
  if (item.quantity === 0) {
    /*
      Creates a new array without the item with the matching id.
      Keeps all the items where the id does not match the item.id.
    */
    state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id);
  }

  // Re-render the cart and update the total price
  renderCartItems();
  updateTotalPrice();
}

// Select the total price element
const totalNumber = document.querySelector('.total-number');

function updateTotalPrice() {
  /* 
    Calculate the total price using reduce.
    Reduce reduces the array to a single value, in this case the total price.
    The second argument, 0, sets the total to zero at the beginning. 
  */ 
  const totalPrice = state.cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  /*
    Update the total price.
    totalNumber references the <span> element displaying the total price. 
    totalPrice.toFixed(2) formats the total price to two decimal places.
    textContent updates the text inside the <span> element to display the new total price.
  */
  totalNumber.textContent = `£${totalPrice.toFixed(2)}`;
}

// Initialize the whole shabang.
renderStoreItems();
renderCartItems();
updateTotalPrice();
renderStoreFilterButtons();