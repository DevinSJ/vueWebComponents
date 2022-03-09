const app = Vue.createApp({
    data: function(){
        return{
            cart: [],
            premium: true
        }
    },
    methods:{
        updateAddCart(id){
            this.cart.push(id); 
        },
        updateTakeCart(id){
            if(this.cart.indexOf(id) > -1){
                this.cart.splice(this.cart.indexOf(id), 1);
            }
        }
    }
})