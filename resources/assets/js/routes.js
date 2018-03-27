import VueRouter from 'vue-router'

const PopularCases = (resolve) => require(['./components/PopularCases.vue'], resolve)
const CreateCase = (resolve) => require(['./components/CreateCase.vue'], resolve)
const MyAccount = (resolve) => require(['./components/MyAccount.vue'], resolve)
const NotFound = (resolve) => require(['./components/NotFound.vue'], resolve)
const Case = (resolve) => require(['./components/Case.vue'], resolve)

// 3. Create the router
export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: PopularCases },
        { path: '/create', component: CreateCase },
        { path: '/myaccount', component: MyAccount },
        { path: '/case/:id', component: Case },
        { path: '*', component: NotFound }
    ]
});
