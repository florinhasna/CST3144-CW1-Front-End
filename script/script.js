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
        productList: [{
            id: 1000,
            title: "Painting",
            imgSrc: "assets/paint.svg",
            location: "Uxbridge",
            price: 100,
            availability: 5,
        },
        {
            id: 1001,
            title: "Math",
            imgSrc: "assets/math.svg",
            location: "Harrow",
            price: 75,
            availability: 5,
        },
        {
            id: 1002,
            title: "English - Grammar",
            imgSrc: "assets/english.svg",
            location: "Watford",
            price: 65,
            availability: 5,
        },
        {
            id: 1003,
            title: "Programming",
            imgSrc: "assets/programming.svg",
            location: "Hendon",
            price: 200,
            availability: 5,
        },
        {
            id: 1004,
            title: "Modern Foreign Languages",
            imgSrc: "assets/mfl.svg",
            location: "Uxbridge",
            price: 150,
            availability: 5,
        },
        {
            id: 1005,
            title: "Modern Arts",
            imgSrc: "assets/arts.svg",
            location: "Hendon",
            price: 75,
            availability: 5,
        },
        {
            id: 1006,
            title: "Physical Education",
            imgSrc: "assets/pe.svg",
            location: "Watford",
            price: 45,
            availability: 5,
        },
        {
            id: 1007,
            title: "Cooking",
            imgSrc: "assets/cooking.svg",
            location: "Harlow",
            price: 35,
            availability: 5,
        },
        {
            id: 1008,
            title: "Biology",
            imgSrc: "assets/biology.svg",
            location: "Harrow",
            price: 55,
            availability: 5,
        },
        {
            id: 1009,
            title: "Psychology",
            imgSrc: "assets/psychology.svg",
            location: "Watford",
            price: 70,
            availability: 5,
        },
        {
            id: 1010,
            title: "Music",
            imgSrc: "assets/music.svg",
            location: "Uxbridge",
            price: 110,
            availability: 5,
        }],
        // order data to be collected
        order: {
            name: '',
            phoneNo: '',
        },
        search: '',
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
                    productsInCart.push({ getOrderedQty: orderQty, getProduct: aProduct });
                    // mark the id as already added
                    usedIDs.push(id);
                }
            });

            return productsInCart;
        }
    },
    methods: {
        addItem(id) { // add item to the cart
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
        }
    },
});