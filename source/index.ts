import Vue, { CreateElement } from "vue";
import App from './App.vue';

new Vue({
    el: "#App",
    render: (createElement: CreateElement) => {
        return createElement(App);
    },
});
