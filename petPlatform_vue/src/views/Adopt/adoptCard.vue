<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    adopt: {
        type: Object,
        default: () => { }
    }
})

</script>
<template>
    <div class="adopt-card">
        <div class="details">信息</div>
        <div class="operation">操作</div>
    </div>
</template>

<style lang="less" scoped>
.adopt-card {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin: 20px 10px;
}
</style>