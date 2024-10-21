<script setup>
import { getUserInfo } from '@/api/api';
import { onMounted } from 'vue';

onMounted(() => {
    getUserInfo(20241018).then((res) => {
        console.log(res);
    }, (err) => { }
    )
})
</script>
<template>
    <el-button type="primary" class="home">Primary Button</el-button>
</template>

<style lang="less">
.home {
    color: @secondary-color; // 直接使用全局变量
}
</style>