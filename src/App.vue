<!-- By default, this should be kept very light. This is the wrapper around our website / application -->
<template>
    <div class="site">
        <!-- <hello></hello> -->
    </div>
</template>

<script>
    // import Hello from './components/Hello'
    import {HTTP} from './http/http-common.js';

    export default {
        name: 'app',
        components: {
            // Hello
        },

        data () {
            return {
                jokes: []
            }
        },

        mounted () {
            // HTTP.get('/jokes/random/10')
            //   .then(response => this.jokes = response.data.value);
        }
    }
</script>

<style lang="scss">
    @import '~styles/global.scss';
</style>
