<script setup>
import homeAside from './homeAside.vue';

</script>
<template>
    <div class="layout">
        <homeAside />
        <RouterView />
    </div>
</template>

<style lang="less">
.layout {
    display: flex;
    height: 100vh;
    width: 100vw;
}
</style>