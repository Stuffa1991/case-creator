/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import InfiniteLoading from 'vue-infinite-loading';
import 'vue-instant/dist/vue-instant.css';
import Loader from './components/Loader';

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

Vue.component('infinite-loading', InfiniteLoading);
Vue.component('loader', Loader);

import router from './routes';

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
	el: '#app',
	router,
	mounted() {
		//console.log('lol');
	}
 
});