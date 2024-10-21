<script setup>
import { getUserInfo } from '@/api/api';
import { onMounted } from 'vue';

onMounted(() => {
    getUserInfo(20241018).then((res) => {
        console.log(res);
    })
})
</script>
<template>
    <div class="home">
        <span>宠物之家</span>
    </div>
</template>
<style></style>