<template>
    <div id="app">
        <header-menu></header-menu>
        <div class="container">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
            <float-button></float-button>
        </div>
        <footer-layout></footer-layout>
    </div>
</template>
<script>
import headerMenu from './components/headerMenu.vue'
import floatButton from './components/floatButton.vue'
import footerLayout from './components/footerLayout.vue'

export default {
    data() {
            return {

            }
        },
        components: {
            headerMenu,
            floatButton,
            footerLayout
        },
        methods: {

        }
}
</script>
<style>
body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
    background: rgb(239, 242, 247);
}

.container {
    margin: 0 auto;
    padding: 2rem;
}
</style>
