app.component('product-display', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :class="[!inStock ? 'out-of-stock-img' : '']">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                
                <!-- <a :href="url">Link to the miami heat store</a> -->
                
                <!-- <p v-if="inStock">In stock</p> -->
                <!-- <p v-else>Out of stock</p> -->
                
                <p v-show="onSale">On Sale</p>
                <p>Shipping: {{ shipping }}</p>

                <p>Shirt Details:</p>
                <product-details :details="details"></product-details>

                <p>Colors:</p>
                <div v-for="(color, index) in colors" 
                    @mouseover="changeShirt(index)" 
                    :key="color.id"
                    class="color-circle"
                    :style="{ backgroundColor: color.color}">
                </div>

                <button class="button" @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">Add to Cart</button>

                <button class="button" @click="takeFromCart">Take from Cart</button>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data: function(){
        return{
            product: 'Shirts',
            teamName: 'Miami Heat',
            description: 'NBA Miami Heat jerseis',
            selectedShirt: 0,
            url: 'https://www.themiamiheatstore.com/',
            // onSale: false,
            details:['50% cotton', '30% wool', '15% polyester'],
            colors: [
                {id: 1, color: 'Black', image: './assets/images/black-miami.jpg', quantity: 100}, 
                {id: 2 ,color: 'White', image: './assets/images/white-miami.jpg', quantity: 0},
            ],
            reviews:[]
            
        }
    },
    methods:{
        addToCart(){
            this.$emit('addToCart', this.colors[this.selectedShirt].id);
        },
        changeShirt(index){
            this.selectedShirt = index;
        },
        takeFromCart(){
            this.$emit('takeFromCart', this.colors[this.selectedShirt].id);
        },
        addReview(review){
            this.reviews.push(review);
        }
    },
    computed:{
        title(){
            if(this.inStock){
                return this.product + ' - ' + this.teamName + ' is on sale';
            }else{
                return this.product + ' - ' + this.teamName;
            }
        }, image(){
            return this.colors[this.selectedShirt].image;
        }, inStock(){
            return this.colors[this.selectedShirt].quantity;
        }, shipping(){
            if(this.premium){
                return 'Free';
            }else{
                return 2.99;
            }
        }
    }
});