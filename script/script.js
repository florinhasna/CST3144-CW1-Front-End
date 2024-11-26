var myApp = new Vue({
    el: "#body",
    data: {
        title: "School classes and activities",
        // property for toggling between elements, switch between checkout and product list
        showProducts: true,
        // cart button settings
        cartIconAlt: "Cart",
        cartIconSrc: "assets/cart.svg",
        idsInCart: [], // save IDs of the objects
        sortBy: "Subject", // default sorting settings
        sortDirection: "Ascending",
        productList: [],
        // order data to be collected
        order: {
            name: '',
            phoneNo: '',
            totalCost: 0,
            items: [],
        },
        errors: {
            phone: '',
            isPhoneValid: false,
            name: '',
            isNameValid: false,
        },
        searchWord: '',
    },
    computed: { // reactive properties for auto-update
        isCartEmpty() { // check if the cart is empty
            return (this.idsInCart.length === 0);
        },

        sortedProducts() { // sort products
            // to sort by price
            function sortByPrice(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }

            // to sort by subject
            function sortBySubject(a, b) {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                return 0;
            }

            // to sort by location
            function sortByLocation(a, b) {
                if (a.location > b.location) return 1;
                if (a.location < b.location) return -1;
                return 0;
            }

            // to sort by availability
            function sortByAvailability(a, b) {
                const countA = cartCountMap[a.id] || 0;
                const countB = cartCountMap[b.id] || 0;

                // Calculate temporary availability
                const adjustedAvailabilityA = a.availability - countA;
                const adjustedAvailabilityB = b.availability - countB;

                if (adjustedAvailabilityA > adjustedAvailabilityB) return 1;
                if (adjustedAvailabilityA < adjustedAvailabilityB) return -1;
                return 0;
            }

            // count occurrences of each item ID in the cart
            const cartCountMap = this.idsInCart.reduce((map, id) => {
                map[id] = (map[id] || 0) + 1;
                return map;
            }, {});

            // check how to sort and sort, calling same sorting method, if is descending, then reverse the result

            // by price
            if (this.sortBy === "Price" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByPrice);
            if (this.sortBy === "Price" && this.sortDirection === "Descending")
                return this.productList.sort(sortByPrice).reverse();

            // by subject
            if (this.sortBy === "Subject" && this.sortDirection === "Ascending")
                return this.productList.sort(sortBySubject);
            if (this.sortBy === "Subject" && this.sortDirection === "Descending")
                return this.productList.sort(sortBySubject).reverse();

            // by location
            if (this.sortBy === "Location" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByLocation);
            if (this.sortBy === "Location" && this.sortDirection === "Descending")
                return this.productList.sort(sortByLocation).reverse();

            // by availability
            if (this.sortBy === "Availability" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByAvailability);
            if (this.sortBy === "Availability" && this.sortDirection === "Descending")
                return this.productList.sort(sortByAvailability).reverse();
        },

        cartItems() { // to populate an array with the product, and the desired order quantity
            // to populate with ids already processed, to avoid duplicates
            var usedIDs = [];
            let productsInCart = [];
            // reset the order.items array every time is called so it can be populated with what is in the cart
            this.order.items = [];

            // loop every id added to the cart
            this.idsInCart.forEach(id => {
                // check if the id was already processed
                if (!usedIDs.includes(id)) {
                    // get the quantity, using cartCound method
                    let orderQty = this.cartCount(id);
                    // get the product from the product list
                    let aProduct = this.productList.find(item => item.id === id);

                    // order item 
                    let orderItem = {
                        getOrderedQty: orderQty,
                        getTotalPrice: orderQty * aProduct.price,
                        getProduct: aProduct
                    };

                    // add the new order object to the relevant array
                    productsInCart.push(orderItem);
                    // add the id of the ordered object in the order.items array
                    this.order.items.push({
                        _id: orderItem.getProduct._id,
                        lessonId: orderItem.getProduct.id,
                        availability: orderItem.getProduct.availability - orderItem.getOrderedQty
                    });
                    // mark the id as already added
                    usedIDs.push(id);
                }
            });

            // to display the list in the checkout page
            return productsInCart;
        },

        cartTotalCost() { // total cost of the cart computation
            let totalCost = 0;
            this.idsInCart.forEach(id => {
                // get the product from the product list
                let aProduct = this.productList.find(item => item.id === id);
                totalCost += aProduct.price;
            });

            this.order.totalCost = totalCost;
            return totalCost;
        },

        isDataValid() { // to check if both name and phone number are valid
            return !(this.errors.isPhoneValid && this.errors.isNameValid);
        },
    },
    methods: {
        addItem(id, price) { // add item to the cart
            this.idsInCart.push(id);
        },

        removeItem(id) { // remove item from the cart
            let indexOf = this.idsInCart.findIndex(item => item === id);

            if (indexOf !== -1) { // when index is -1, element was not found
                // remove the element that was found
                this.idsInCart.splice(indexOf, 1);
            }
        },

        showCheckout() { // toggle between products and checkout
            this.showProducts = this.showProducts ? false : true;
        },

        cartCount(productID) { // count the ids added to the cart
            count = 0;

            this.idsInCart.forEach(element => {
                if (element === productID)
                    count++;
            });

            return count;
        },

        validatePhone() { // validates phone number
            // regex for phone number validation
            const phoneRegex = /^\+?[0-9]\d{10,13}$/;
            this.errors.isPhoneValid = phoneRegex.test(this.order.phoneNo);
            this.errors.phone = !this.order.phoneNo
                ? "Valid phone number is required."
                : !this.errors.isPhoneValid
                    ? "Invalid phone number format."
                    : "";
        },

        validateName() { // validates name
            // regex for name validation
            const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
            this.errors.isNameValid = fullNameRegex.test(this.order.name);
            this.errors.name = !this.order.name
                ? "Full name is required."
                : !this.errors.isNameValid
                    ? "Invalid name format."
                    : "";
        },

        async search() { // search lessons
            if (this.searchWord !== "") {
                await fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/collections/lessons/search/${this.searchWord}/${this.sortBy}/${this.sortDirection}`)
                    .then(response => response.json())
                    .then(json => {
                        this.productList = json; // `this` correctly refers to Vue instance
                    })
                    .catch(error => {
                        console.error('Error fetching search results:', error);
                    });
            } else {
                fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/collections/lessons/${this.sortBy}/${this.sortDirection}`).then(
                    function (response) {
                        response.json().then(
                            function (json) {
                                myApp.productList = json;
                            }
                        )
                    }
                );
            }

        },

        async placeOrder() { // to place the order, sends requests to back-end
            // post request to create the order in the Orders collection
            await fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/place-order`,
                { // set the request configuration
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // data type to JSON
                    },
                    body: JSON.stringify(this.order),
                }).then( // handle the response, print it
                    function (response) {
                        response.json().then(
                            function (json) {
                                alert("Order placed with number: " + json.insertId);
                            }
                        )
                    }
                )

            // put request to update the availability of the lessons in the database
            await fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/collections/lessons/update`,
                { // set the request configuration
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json", // data type to JSON
                    },
                    body: JSON.stringify(this.order.items),
                }
            ).then( // handle the response, print it
                function (responsePut) {
                    responsePut.json().then(
                        function (jsonPut) {
                            console.log(jsonPut);
                        }
                    )
                }
            )

            // reload the page to show the updates
            location.reload();
        }
    },
    created:
        function () {
            fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/collections/lessons/${this.sortBy}/${this.sortDirection}`).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            myApp.productList = json;
                        }
                    )
                }
            );
        },
});