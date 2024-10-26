<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import defaultImg from '../../../public/image/pet.jpg'

const props = defineProps({
    pet: Object,
    default: () => ({
        name: 'Luna',
        gender: 'Female',
        age: 2,
    })
});
const petImg = ref(props.pet?.PetPhotos[0]?.url ? props.pet?.PetPhotos[0]?.url : defaultImg);
</script>
<template>
    <div class="pet-card">
        <!-- 宠物照片 -->
        <img :src="petImg" alt="Pet Image" class="pet-image" />

        <!-- 宠物信息 -->
        <div class="pet-info">
            <div class="pet-name">
                <span>昵称：</span>{{ props.pet.name || 'Luna' }}
            </div>
            <div class="pet-age">
                <span>年龄：</span>{{ props.pet.age || 2 }}岁
            </div>
            <div class="pet-gender">
                <span>性别：</span>{{ props.pet.gender === 'male' ? '雄性' : '雌性' }}
            </div>
            <div class="pet-breed">
                <span>品种：</span>{{ props.pet.breed || '' }}
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.pet-card {
    width: 150px;
    height: 210px;
    border: 1px solid #ccc;
    border-radius: 12px;
    cursor: pointer;
}

.pet-image {
    width: 100%;
    height: 130px;
    border-radius: 12px;
}

.pet-info {
    margin: 0 5px;
    font-size: 12px;

    &>div>span {
        font-weight: bold;
        color: #929191;
    }
}
</style>