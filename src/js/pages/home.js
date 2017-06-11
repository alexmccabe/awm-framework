import Home from './home.vue';

import Vue from 'vue';

class Thing {
    constructor() {
        console.log('new thing');
    }
}

new Vue({
    el: '#app',

    template: '<home></home>',

    components: {
        Home
    },

    mounted () {
        new Thing();
    }
});