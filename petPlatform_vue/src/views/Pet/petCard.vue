<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    pet: Object,
    default: () => ({
        name: 'Luna',
        gender: 'Female',
        age: 2,
    })
});
const pet = ref(props.pet);
</script>
<template>
    <div class="pet-card">
        <!-- 宠物照片 -->
        <img src="../../../public/image/pet.jpg" alt="Pet Image" class="pet-image" />

        <!-- 宠物信息 -->
        <div class="pet-info">
            <div class="pet-name">{{ props.pet.name || 'Luna' }}</div>
            <div class="pet-age">{{ props.pet.age || 2 }} years old</div>
            <div class="pet-breed">{{ props.pet.gender || 'Female' }}</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.pet-card {
    width: 150px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 12px;
    cursor: pointer;
}

.pet-image {
    width: 100%;
    height: 130px;
    border-radius: 12px;
}
.pet-info{
    margin:0 5px;
    font-size: 12px;
}
</style>