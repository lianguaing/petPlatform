<script setup>
import homeAside from './homeAside.vue';
import Nav from './Nav.vue';

</script>
<template>
    <div class="layout">
        <homeAside />
        <div class="main">
            <Nav />
            <RouterView />
        </div>
    </div>
</template>

<style lang="less">
.layout {
    display: flex;
    height: 100vh;
    width: 100vw;
}
.main {
    flex: 1;
    overflow: auto;
    padding-left:2px;
    box-sizing: border-box;
}
</style>