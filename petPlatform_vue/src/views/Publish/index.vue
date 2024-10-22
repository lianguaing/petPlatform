<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore.js'
import { getPetInfoByUserId } from '@/api/api';
import publishCard from './publishCard.vue';

const userStore = useUserStore()

const router = useRouter()
//当前用户信息
const userInfo = ref(userStore.userInfo)
//发布列表
const publishList = ref({})
//获取当前用户发布列表
async function getPublishByUserId() {
    const res = await getPetInfoByUserId(userInfo.value.id)
    publishList.value = res.data.pet
    console.log(publishList.value)
}
onMounted(() => {
    getPublishByUserId()
})
</script>
<template>
    <div class="publish-main">
        <h3 class="text">我的发布</h3>
        <div class="border-box"></div>
        <!-- 发布列表 -->
        <div class="publish-list">
            <div class="publish-item" v-for="item in publishList" :key="item.id">
                <publishCard />
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

</style>