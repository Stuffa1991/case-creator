<template>
	<div class="container">
		<div class="row" v-show="loaded == 0">
          <loader></loader>
        </div>
        <div class="row" v-show="loaded == 1">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div class="row">
					<div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
						<div class="openingSpinner">
                            <div v-show="showWin" class="top-win"></div>
                            <div v-show="showWin" class="bottom-win"></div>
							<div v-show="showWin" class="pre-win"></div>
							<div v-show="showWin" class="win"></div>
							<div v-show="showWin" class="after-win"></div>
							<div v-show="!showWin" class="selected"></div>
							<div class="scrollBox" :style="spinStyle">
								<div class="potentialWinning" :style="itemStyle" :class="item.iteminfo.type" v-for="item in caseItems">
									<div class="caseContent">
										<h4 class="name">{{ item.iteminfo.market_name }}</h4>
										<img class="image" :src="item.iteminfo.imageurl">
									</div>
								</div>
							</div>
						</div>
						<div class="openSection">
							<button type="button" :disabled="rollDisabled" @click="openCase" class="btn btn-success">Open Case</button>
						</div>
						<div class="potentialWinnings">
							<div class="heading">
								<h3 class="itemsInCase"> {{ items.length }} Items in this case </h3>
							</div>
							<div class="potentialItems">
								<div class="potentialWinning" :class="item.iteminfo.type" v-for="item in items">
									<div class="caseContent">
										<h4 class="name">{{ item.iteminfo.market_name }}</h4>
										<img class="image" :src="item.iteminfo.imageurl">
										<h4 class="percentage">{{ item.percentage }}%</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
						<h4> {{ caseName }}</h4>
						<span> {{ casePrice }}$</span>
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
                api: '/api/case/', //our api url
                caseName: '',
                casePrice: '',
                caseId: this.$route.params.id,
                items: [], //Items in the case
                caseItems: [], //Items in the case animation window
                repeatItems: 40, //Repeats winning items x amount of time
                fakeItems: 30, //How many items to fake spinning by before hitting
                widthImg: 124, //Width of input pictures
                lengthInPx: 0, //Width of the entire animation container in px - is automatically set
                wonItem: '', //In px what number you won - is automatically set
                itemWon: '', //To show information about the item won - Dont touch
                animDuration: 5, //How long should the roll animation be
                winnerDuration: 0.5, //How long it should take for it to be on the winning item after the animation
                spinStyle: {}, //To dynamically change the style
                rollDisabled: true, //To disable enable the open case button
                loaded: 0,
                itemStyle: { border: '1px solid #eee;'},
                absoluteZero: 311, //Where the selector meets the first edge of a img - in px
                showWin: false //Show winner css
            }
        },
        mounted() {
         	this.loadCase();
        },
        methods: {
            loadCase() {
                axios.get(this.api + 'get/' + this.caseId)
                .then((res) => {
                    //Case Price
                    this.casePrice = (res.data.totalPrice).toFixed(3);
                    //Case Name
                    this.caseName = res.data.name;
                    //Case items information
                    this.items = this.items.concat(res.data.items);

                    //We do this to make sure the item its defaulted on is pushed a little so they dont see the edge on the right
                    this.wonItem = this.absoluteZero - (this.widthImg * (this.items.length)) * 2 - (this.widthImg/2);

                    //We need to make a new array for 
                    this.makeArray((newArray) => {
                    	//Populate case items
                    	this.caseItems = newArray;
		            	//Get container width
		            	this.lengthInPx = this.caseItems.length*this.widthImg;

		            	//Set the animation
		            	this.setRollStyle();
		            	//Enable open case
		            	this.rollDisabled = false;
		            	//This request has been loaded
		            	this.loaded++;
                    });
                });
            },
            makeArray(callback) {
            	//We create a new array to populate the case animation row
            	let newArray = [];
            	for(let i=0; i < this.repeatItems; i++){
            		newArray.push.apply(newArray, this.items);
            	}

            	callback(newArray);
            },
            resetAnimate() {
        		//We style the object to make it reset
            	this.spinStyle = {
            		transform: `translateX(0)`,
            		transition: `all ease 0s`
            	};
            },
            setRollStyle() {
				//We style the object to make it spin
            	this.spinStyle = {
            		width: `${this.lengthInPx}px`, 
            		transform: `translateX(${this.wonItem}px)`,
            		transition: `all cubic-bezier(0.075, 0.800, 0.17, 1.000) ${this.animDuration}s`
            	};
            },
            setWinnerStyle(fixedRoll) {
            	//We style the object to make it spin
            	this.spinStyle = {
            		width: `${this.lengthInPx} px`, 
            		transform: `translateX(${fixedRoll}px)`,
            		transition: `all ease ${this.winnerDuration}s`
            	};

                //Show winner animation when its done going onto the item
                setTimeout(() => {
                    //Enable opening the case again
                    this.rollDisabled = false;
                    //Show winner stuff
                    this.showWin = true;
                }, this.winnerDuration*1000+100);
            },
            openCase() {
            	axios.get(this.api + 'open/' + this.caseId, {

            	}).then((res) => {
            		if(res.data.status == 'error') {
            			//A unknown error happened
            		} else {
                        document.getElementById('userBalance').textContent = (res.data.message.balance).toFixed(2);

            			//index of the won item
            			let itemIndex = res.data.message.index;

            			//Info about weapon
            			this.itemWon = res.data.message.item.iteminfo;
            			//Roll the item with index
            			this.rollItem(itemIndex);
                        console.log(res.data)
            		}
            	});
            },
            rollItem(index) {
            	//We disabled the button
            	this.rollDisabled = true;
                this.showWin = false;

            	//Index eg. 2 * imageWidth -1 for border + absoluteZero of div - This is slightly static rolls but meh
            	let minRoll = -(index * this.widthImg) + this.absoluteZero + this.widthImg;
            	let maxRoll = minRoll - this.widthImg;

                //we add 10 px to just make it never land on the border
                let minRollMargin = minRoll - 10;
                let maxRollMargin = maxRoll + 10;

            	//Reset animation
            	this.resetAnimate();

                //We fake some rolls to make it spin nice
            	let fakeRoll = -((this.fakeItems*this.items.length)*this.widthImg);

            	//Math random a minRoll between maxRoll
            	let randomRoll = Math.floor(Math.random() * ((maxRollMargin-minRollMargin)+1) + minRollMargin);

            	//The random between for the item and fake roll
            	this.wonItem = randomRoll + fakeRoll;

            	//We fix a roll to the center of the item - this is to make sure nobody gets confused Using initial values to make it actually center
            	let fixedRoll = (minRoll + maxRoll) / 2 + fakeRoll;

            	//Hack to make sure browser see's changes
            	setTimeout(() => {
            		//Set animation styling
            		this.setRollStyle();

                    //Execute the winner animation after roll is done
                    setTimeout(() => {
                        this.setWinnerStyle(fixedRoll);
                    },this.animDuration*1000+1000);
            	},0);
            }
        }
    }
</script>