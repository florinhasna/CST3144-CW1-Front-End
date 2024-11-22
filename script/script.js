var myApp = new Vue({
    el: "#body",
    data: {
        // property for toggling between elements, switch between checkout and product list
        showProducts: true,
        // cart button settings
        cartIconAlt: "Cart",
        cartIconSrc: "assets/cart.svg",
        idsInCart: [], // save IDs of the objects
        // default sorting settings
        sortBy: "Subject",
        sortDirection: "Ascending",
        productList: [],
        // order data to be collected
        order: {
            name: '',
            phoneNo: '',
            totalCost: 0,
        },
        errors: {
            phone: '',
            name: '',
        },
        searchWord: '',
    },
    computed: { // reactive properties for auto-update
        isCartEmpty() {
            return (this.idsInCart.length === 0);
        },

        // sort products
        sortedProducts() {
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

        // to populate an array with the product, and the desired order quantity
        cartItems() {
            // to populate with ids already processed, to avoid duplicates
            var usedIDs = [];
            var productsInCart = [];

            // loop every id added to the cart
            this.idsInCart.forEach(id => {
                // check if the id was already processed
                if (!usedIDs.includes(id)) {
                    // get the quantity, using cartCound method
                    let orderQty = this.cartCount(id);
                    // get the product from the product list
                    let aProduct = this.productList.find(item => item.id === id);
                    // add the two as a new object to the array
                    productsInCart.push({
                        getOrderedQty: orderQty,
                        getTotalPrice: orderQty * aProduct.price,
                        getProduct: aProduct
                    });
                    // mark the id as already added
                    usedIDs.push(id);
                }
            });

            return productsInCart;
        },

        // total cost of the cart computation
        cartTotalCost() {
            let totalCost = 0;
            this.idsInCart.forEach(id => {
                // get the product from the product list
                let aProduct = this.productList.find(item => item.id === id);
                totalCost += aProduct.price;
            });
            return totalCost;
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
        cartCount(productID) {
            count = 0;

            this.idsInCart.forEach(element => {
                if (element === productID)
                    count++;
            });

            return count;
        },
        validatePhone() {
            // regex for phone number validation
            const phoneRegex = /^\+?[0-9]\d{10,13}$/;
            this.errors.phone = !this.order.phoneNo
                ? "Valid phone number is required."
                : !phoneRegex.test(this.order.phoneNo)
                    ? "Invalid phone number format."
                    : "";
        },
        validateName() {
            const fullNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
            this.errors.name = !this.order.name
                ? "Full name is required."
                : !fullNameRegex.test(this.order.name)
                    ? "Invalid name format."
                    : "";
        },
        // search lessons
        search() {
            fetch(`https://cst3144cwlessonsbookingsystem-env.eba-kxsnegmz.eu-west-2.elasticbeanstalk.com/search/${this.searchWord}/${this.sortBy}/${this.sortDirection}`).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            this.productList = json;
                        }
                    )
                })
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