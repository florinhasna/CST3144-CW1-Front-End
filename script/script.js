var myApp = new Vue({
    el: "#body",
    data: {
        showProducts: true, // property for toggling between elements
        cartIconAlt: "Cart", 
        cartIconSrc: "assets/cart.png",
        objectsInCart: [],
        product: {
            id: 1234,
            title: "Painting",
            imgSrc: "assets/paint.png",
            location: "London",
            price: 100,
            availability: 5, 
        },
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            county: '',
            postcode: '',
            method: '',
            phoneNo: '',
            email: '',
        }
    },
    computed:{ // reactive properties for auto-update
        isAvailable(){
            return this.product.availability > this.objectsInCart.length;
        },
    },
    methods:{
        addItem(){ // add item to the cart
            this.objectsInCart.push(this.product.id);
        },
        showCheckout(){ // toggle between products and checkout
            this.showProducts = this.showProducts ? false : true;
        }
    },
});