<template>
    <div class="container">
        <div class="row" v-show="loaded == 0">
          <loader></loader>
        </div>
        <div class="row" v-show="loaded == 1">
           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h3>Active winnings</h3>
                <div class="panel panel-default">
                  <div class="panel-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sell</th>
                                <th>Withdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in user.has_items">
                                <td>{{ item.iteminfo.market_name }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
           </div>
           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h3>Transactions</h3>
                <div class="panel panel-default">
                  <div class="panel-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction in user.transactions">
                                <td>{{ transaction.action }}</td>
                                <td>{{ transaction.amount }}</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                api: '/api/user/', //our api url
                loaded: 0,
                user: {},
            }
        },
        mounted() {
            this.loadUser()
        },
        methods: {
            loadUser() {
                axios.get(this.api)
                .then((res) => {
                    this.loaded++;

                    this.user = res.data;
                });
            }
        }
    }
</script>
