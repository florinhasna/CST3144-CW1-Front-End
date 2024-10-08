var myApp = new Vue({
    el: "#body",
    data: {
        showProducts: true, // property for toggling between elements
        cartIconAlt: "Cart", 
        cartIconSrc: "assets/cart.png",
        objectsInCart: [],
        productList: [{
            id: 1000,
            title: "Painting",
            imgSrc: "assets/paint.png",
            location: "London",
            price: 100,
            availability: 5, 
        },{
            id: 1001,
            title: "Math",
            imgSrc: "assets/math.png",
            location: "London",
            price: 75,
            availability: 5, 
        },{
            id: 1002,
            title: "English - Grammar",
            imgSrc: "assets/english.png",
            location: "London",
            price: 65,
            availability: 5, 
        },{
            id: 1003,
            title: "Programming",
            imgSrc: "assets/programming.png",
            location: "London",
            price: 200,
            availability: 5, 
        },{
            id: 1004,
            title: "MFL - Modern Foreign Languages",
            imgSrc: "assets/mfl.png",
            location: "London",
            price: 150,
            availability: 5, 
        },{
            id: 1005,
            title: "Modern Arts",
            imgSrc: "assets/arts.png",
            location: "London",
            price: 75,
            availability: 5, 
        },{
            id: 1006,
            title: "PE - Physical Education",
            imgSrc: "assets/pe.png",
            location: "London",
            price: 45,
            availability: 5, 
        },{
            id: 1007,
            title: "Cooking",
            imgSrc: "assets/cooking.png",
            location: "London",
            price: 35,
            availability: 5, 
        },{
            id: 1008,
            title: "Biology",
            imgSrc: "assets/biology.png",
            location: "London",
            price: 55,
            availability: 5, 
        },{
            id: 1009,
            title: "Psychology",
            imgSrc: "assets/psychology.png",
            location: "London",
            price: 70,
            availability: 5, 
        },{
            id: 1010,
            title: "Music",
            imgSrc: "assets/music.png",
            location: "London",
            price: 110,
            availability: 5, 
        },],
        order: {
            name: '',
            phoneNo: '',
        }
    },
    computed:{ // reactive properties for auto-update
        
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