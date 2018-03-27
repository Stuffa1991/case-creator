<template>
    <div class="container">
        <div class="row" v-show="loaded === 0">
            <loader></loader>
        </div>
        <div class="row" v-show="loaded === 1">
            <div class="col-lg-4" v-for="(item,index) in cases">
                <router-link :to="'/case/' + item.id">{{ item.name }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cases: [],
                api: '/api/case/', //our api url
                loaded: 0
            }
        },
        mounted() {
            this.loadCases()
        },
        methods: {
            loadCases() {
                axios.get(this.api + 'all')
                    .then((res) => {
                        this.cases = this.cases.concat(res.data);

                        this.loaded++;
                    });
            }
        }
    }
</script>
