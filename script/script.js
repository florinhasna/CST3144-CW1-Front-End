var myApp = new Vue({
    el: "#body",
    data: {
        showProducts: true, // property for toggling between elements
        cartIconAlt: "Cart", 
        cartIconSrc: "assets/cart.svg",
        objectsInCart: [],
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
            location: "Harrow",
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
        order: {
            name: '',
            phoneNo: '',
        },
        search: '',
    },
    computed:{ // reactive properties for auto-update
        isCartEmpty() {
            return (this.objectsInCart.length === 0);
        },

        // sort products
        sortedProducts() {
            // to sort by price
            function sortByPrice (a, b) {
                if(a.price > b.price) return 1;
                if(a.price < b.price) return -1;
                return 0;
            }

            // to sort by subject
            function sortBySubject(a, b) {
                if(a.title > b.title) return 1;
                if(a.title < b.title) return -1;
                return 0;
            }

            // to sort by location
            function sortByLocation(a, b) {
                if(a.location > b.location) return 1;
                if(a.location < b.location) return -1;
                return 0;
            }

            // to sort by availability
            function sortByAvailability(a, b) {
                if(a.availability > b.availability) return 1;
                if(a.availability < b.availability) return -1;
                return 0;
            }

            // check how to sort and sort, calling same sorting method, if is descending, then reverse the result
            
            // by price
            if(this.sortBy === "Price" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByPrice);
            if(this.sortBy === "Price" && this.sortDirection === "Descending")
                return this.productList.sort(sortByPrice).reverse();
            
            // by subject
            if(this.sortBy === "Subject" && this.sortDirection === "Ascending")
                return this.productList.sort(sortBySubject);
            if(this.sortBy === "Subject" && this.sortDirection === "Descending")
                return this.productList.sort(sortBySubject).reverse();
            
            // by location
            if(this.sortBy === "Location" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByLocation);
            if(this.sortBy === "Location" && this.sortDirection === "Descending")
                return this.productList.sort(sortByLocation).reverse();
            
            // by availability
            if(this.sortBy === "Availability" && this.sortDirection === "Ascending")
                return this.productList.sort(sortByAvailability);
            if(this.sortBy === "Availability" && this.sortDirection === "Descending")
                return this.productList.sort(sortByAvailability).reverse();
        },
    },
    methods:{
        addItem(id){ // add item to the cart
            this.objectsInCart.push(id);
        },
        showCheckout(){ // toggle between products and checkout
            this.showProducts = this.showProducts ? false : true;
        },
        cartCount(productID) {
            count = 0;

            this.objectsInCart.forEach(element => {
                if(element === productID)
                    count++;
            });

            return count;
        }
    },
});