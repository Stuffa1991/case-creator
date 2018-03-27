<template>
    <div class="container">
        <div class="row" v-show="loaded === 0">
            <loader></loader>
        </div>
        <div class="row" v-show="loaded > 1">
            <div class="col-lg-12">
                <div class="row itemName">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <div class="createItemHeader text-center">1</div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 content">
                        <span>Name your case</span>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 content">
                        <input class="form-control input50" id="caseName" name="query" placeholder="Enter a name"
                               v-model="caseName" @change="onCaseName">
                    </div>
                </div>
                <div class="caseImageHeader">
                    <div class="row">
                        <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                            <div class="createItemHeader text-center">2</div>
                        </div>
                        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 content">
                            <span>Choose an image your case</span>
                        </div>
                    </div>
                </div>
                <div class="caseImages">
                    <div class="row">
                        <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                            <!-- Whitespace -->
                        </div>
                        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 container">
                            <div class="row">
                                <div id="caseImages" class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                                     v-for="(item,index) in caseimages">
                                    <div class="caseCaption" :class="{ active: chosenImage === item.id }"
                                         @click="chooseImage(item.id)">
                                        <img :src="item.imageurl">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="itemSearch">
                    <div class="row">
                        <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                            <div class="createItemHeader text-center">3</div>
                        </div>
                        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                            <div class="row content">
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <input class="search form-control" name="query" placeholder="Search"
                                           v-model="searchInput" @keyup.enter="onSearch">
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <select id="inputType" class="form-control" v-model="orderBy" @change="onSortBy">
                                        <option value="price">Price</option>
                                        >
                                        <option value="name">Name</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <select id="inputSort" class="form-control" v-model="orderSort" @change="onSort">
                                        <option value="desc">DESC</option>
                                        <option value="asc">ASC</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <select id="inputType" class="form-control" v-model="orderByQuality"
                                            @change="onSortQuality">
                                        <option value="all">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row item">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <!-- Whitespace -->
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 container">
                        <div class="row">
                            <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6" v-for="(item,index) in itemlist"
                                 @click="onAddItem(item,index)">
                                <div class="thumbnail">
                                    <div class="caption-img">
                                        <img :src="item.imageurl">
                                    </div>
                                    <div class="caption">
                                        <h5 v-text="item.market_name"></h5>
                                        <p v-text="item.price"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <infinite-loading spinner="waveDots" :on-infinite="onInfinite" ref="infiniteLoading">
                <span slot="no-more">
                  Nothing found
                </span>
                        </infinite-loading>
                    </div>
                </div>
                <div class="row itemHeader">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <div class="createItemHeader text-center">4</div>
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 content">
                        <span>Set the drop rates</span>
                    </div>
                </div>
                <div class="row items">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <!-- Whitespace -->
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12 itemlist">
                        <table class="table table-striped" v-if="itemcaselist.length > 0">
                            <thead>
                            <tr>
                                <td class="header col-lg-4 col-md-4 col-sm-4 col-xs-4">Name</td>
                                <td class="header col-lg-2 col-md-2 col-sm-2 col-xs-2">Price</td>
                                <td class="header col-lg-2 col-md-2 col-sm-2 col-xs-2">Price change</td>
                                <td class="header col-lg-2 col-md-2 col-sm-2 col-xs-2">% Drop rates</td>
                                <td class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></td>
                            </tr>
                            </thead>
                            <tr v-for="(item,index) in itemcaselist">
                                <td>{{ item.market_name }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.pricechange.toFixed(2) }}</td>
                                <td>
                                    <input class="form-control" @keyup="calcPrice(item.odds,index)" v-model="item.odds"
                                           placeholder="Insert" autofocus="" min="0.00001" max="100" step="1"
                                           type="number">
                                </td>
                                <td class="text-center" @click="onRemoveItem(item,index)"><span
                                    class="glyphicon glyphicon-trash" aria-hidden="true"></span></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><span>Total {{ totalPrice.toFixed(2) }}</span></td>
                                <td><span>Odds {{ totalOdds }}</span></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row errors">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <!-- Whitespace -->
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div v-if="this.caseName === ''" class="alert alert-danger" role="alert">
                                    <a href="#caseName" class="alert-link">You forgot a casename</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div v-if="this.chosenImage === ''" class="alert alert-danger" role="alert">
                                    <a href="#caseImages" class="alert-link">You have to pick a picture</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row errors">
                    <div class="col-lg-1 col-md-1 hidden-sm hidden-xs">
                        <!-- Whitespace -->
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div v-if="itemcaselist.length < 2" class="alert alert-danger" role="alert">Choose at least 2
                            items
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div v-if="(totalOdds < 100 || totalOdds > 100) && itemcaselist.length > 1"
                             class="alert alert-danger" role="alert">Odds need to be combined 100
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div v-if="totalMinus === 1" class="alert alert-danger" role="alert">One odds is below minus
                        </div>
                        <div v-else-if="totalMinus > 1" class="alert alert-danger" role="alert">Several odds is below
                            minus
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                        <div v-if="itemcaselist.length === maxItems" class="alert alert-danger" role="alert">Max item
                            reached
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                        <button @click="onSubmit" :disabled="isSubmitDisabled" type="submit" class="btn btn-success">
                            Submit
                        </button>
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
                caseName: '', //Name of the case
                caseimages: [], //Populated with all case images
                chosenImage: '', //What number picture they choose
                itemlist: [], //populated with all items
                caseinfo: [],
                itemcaselist: [], //populated with the items they choose
                api: '/api/case/', //our api url
                searchInput: '', //If they search by name
                orderSort: 'desc', //What we sort after
                orderBy: 'price', //What is ordered by
                orderByQuality: 'all', //WIP
                nextPage: 1, //To figure out what next page is
                isSubmitDisabled: true, //Is submit disabled yes?no
                maxItems: 10, //How many items a person can pick
                totalOdds: 0, //totalOdds calculated
                totalPrice: 0, //totalPrice calculated
                totalMinus: 0, //Total minus
                loaded: 0 //Used to check if the site is fully loaded
            };
        },
        mounted() {
            this.loadImages();
            this.onInfinite();
        },
        methods: {
            onCaseName() {
                Vue.set(this.caseinfo, 'casename', this.caseName);
                this.isSubmitable();
            },
            loadImages() {
                axios.get(this.api + 'images', {}).then((res) => {
                    let data = res.data;
                    this.caseimages = this.caseimages.concat(data);
                    this.loaded++;
                });
            },
            chooseImage(id) {
                //Set the active class and save what case they picked
                this.chosenImage = id;
                Vue.set(this.caseinfo, 'imageid', id);
                this.isSubmitable();
            },
            //Loads automatically
            onInfinite() {
                axios.get(this.api + 'items', {
                    //Params for the get request
                    params: {
                        page: this.nextPage,
                        name: this.searchInput,
                        order: this.orderSort,
                        orderBy: this.orderBy
                    },
                }).then((res) => {
                    //We check nextpageurl
                    let nextPageUrl = res.data.next_page_url;
                    //Returned data
                    let data = res.data;

                    //Check if there was an error
                    if (data.status === 'error') {
                        //Complete infiniteloading if an error happened
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    } else if (data.data) {
                        //Concat all the data down into itemlist
                        this.itemlist = this.itemlist.concat(data.data);
                        //Tell infiniteloading we are loading
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        //Next page is +=1
                        this.nextPage += 1;
                        //If nextpageurl is null, there are no mo items, tell infinite loading to complete
                        if (nextPageUrl == null) {
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }
                    } else {
                        //If data.data isnt there we complete
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }

                    this.loaded++;
                });
            },
            onSearchChange() {
                //Set this.itemlist empty to load in new data
                this.itemlist = [];
                //Reset nextpage to load first page
                this.nextPage = 1;
                //Tell infiniteloading to reset and load new data
                this.$nextTick(() => {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                });
            },
            onSearch() {
                this.onSearchChange();
            },
            onSort() {
                this.onSearchChange();
            },
            onSortBy() {
                this.onSearchChange();
            },
            onSortQuality() {
                this.onSearchChange();
            },
            onAddItem(item, index) {
                //If the value already exists, in case they updated the search etc.
                if (this.itemcaselist.filter((obj) => {
                        return obj.id === item.id
                    }).length > 0) return;
                //If the case is full
                if (this.itemcaselist.length === this.maxItems) return;
                //Remove the item from the array of loaded items
                this.itemlist.splice(index, 1)
                //Add property odds to calculate total odds
                item.odds = 0;
                //Add property pricechange to calculate total price
                item.pricechange = 0;
                //Push the item to the other array to display it under
                this.itemcaselist.push(item);

                //If the itemlist is empty we add next page
                if (this.itemlist === 0) {
                    //If we managed to add all items on the current page we tell to load the next one
                    this.$nextTick(() => {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                    });
                }

                //Put the items into the case info, this.caseinfo.items
                Vue.set(this.caseinfo, 'items', this.itemcaselist);

                //We calculate totals to check if something is off, eg. minus odds
                this.calcTotals();
            },
            onRemoveItem(item, index) {
                //Remove item from array
                this.itemcaselist.splice(index, 1)
                //Push it back to old array
                this.itemlist.push(item);

                //We calculate totals to check if something is off, eg. minus odds
                this.calcTotals();
            },
            calcPrice(odds, index) {
                //Get price of item
                let price = this.itemcaselist[index].price;
                //If odds is empty set it to 0 programatically
                odds = odds === '' ? 0 : odds;
                //Calculate price change
                price = price / 100 * odds * 1.15;
                //Update array via vue to keep the binding
                Vue.set(this.itemcaselist[index], 'pricechange', price);
                Vue.set(this.itemcaselist[index], 'odds', odds);

                //Calcuate totals
                this.calcTotals();
            },
            isSubmitable() {
                this.isSubmitDisabled = !(this.totalMinus === 0 && this.totalOdds === 100 && this.itemcaselist.length >= 2);
            },
            calcTotals() {
                //We set all to 0 everytime to reset them
                this.totalPrice = 0;
                this.totalOdds = 0;
                this.totalMinus = 0;
                this.itemcaselist.map((q) => {
                    this.totalPrice += parseFloat(q.pricechange);
                    this.totalOdds += parseFloat(q.odds);
                    this.totalMinus += parseFloat(q.odds) < 0 ? 1 : 0;
                });
                this.isSubmitable();
            },
            onSubmit() {
                if (this.caseName === '') {
                    location.hash = "#";
                    location.hash = "#caseName";
                    return;
                }
                ;
                if (this.chosenImage === '') {
                    location.hash = "#";
                    location.hash = "#caseImages";
                    return;
                }
                ;
                if (this.isSubmitDisabled) return;

                let data = Object.assign({}, this.caseinfo);

                axios.post(this.api + 'create', {
                        case: data
                    })
                    .then((res) => {
                        this.$router.push(`/case/${res.data.message}`);
                    })
                    .catch((err) => {

                    });
            }
        }
    };

</script>
