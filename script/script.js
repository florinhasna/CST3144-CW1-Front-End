var myApp = new Vue({
    el: "#body",
    data: {
        showProducts: true, // property for toggling between elements
        cartIconAlt: "Cart", 
        cartIconSrc: "assets/cart.svg",
        objectsInCart: [],
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
            title: "MFL - Modern Foreign Languages",
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
            title: "PE - Physical Education",
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
        }
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