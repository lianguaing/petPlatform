<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore.js'
// import { useAdoptStore } from '../../stores/adoptStore.js'
import { getAdoptionInfo } from '@/api/api';
import adoptCard from './adoptCard.vue';

const userStore = useUserStore()
// const adoptStore = useAdoptStore()

const router = useRouter()
//当前用户信息
const userInfo = ref(userStore.userInfo)
//领养列表
const adoptList = ref({})
//获取当前用户领养列表
async function getadoptByUserId() {
    const res = await getAdoptionInfo(userInfo.value.id)
    adoptList.value = res.data.adoptionR
    console.log('领养列表1：', adoptList.value)
    // const res = await adoptStore.getAdoptMessage()
    // if (res) adoptList.value = adoptStore.adoptInfo
}
onMounted(() => {
    getadoptByUserId()
})
</script>

<template>
    <div class="adopt-main">
        <h3 class="text">我的领养</h3>
        <div class="border-box"></div>
        <!-- 领养列表 -->

        <div class="adopt-list">
            <div class="adopt-item" v-for="item in adoptList" :key="item.id">
                <adoptCard :adopt="item" @update:adopt="getadoptByUserId" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.text {
    font-size: 30px;
    font-weight: 600;
    color: @primary-color;
    margin-top: 20px;
    margin-left: 20px;
}

.border-box {
    height: 2px;
    width: 100%;
    background-color: @primary-color;
    margin-top: 20px;
    border-radius: 10px;
}

.adopt-list {
    margin: 20px 10px;
}

.adopt-item {
    margin-bottom: 20px;
}
</style>