<script setup>
import { defineProps, reactive, ref } from 'vue';
import { getAdoptionInfoByPetId, getUserInfo, updateAdoptionInfo } from "@/api/api"
import userAdoptList from './userAdoptList.vue';

const props = defineProps({
    pet: {
        type: Object,
        default: () => { }
    }
})
const petInfo = ref(props.pet)
const petAdopt = ref([])

const showList = ref(false)
const handleShow = async () => {
    showList.value = !showList.value
    //根据宠物id查询申请表
    updateShow(petInfo.value.id)
}
//更新申请列表
async function updateShow(id) {
    const res = await getAdoptionInfoByPetId(id)
    petAdopt.value = res.data.adoptionR
    console.log(petAdopt.value)
}
//处理同意申请/拒绝申请
async function handleChangeStatus(event) {
    const flag = event[0]
    const id = event[1]
    if (flag) {
        //修改申请表状态为同意
        const res = await updateAdoptionInfo(id, { status: 'approved' })
    } else {
        //修改申请表状态为拒绝 'rejected'
        const res = await updateAdoptionInfo(id, { status: 'rejected' })
    }
    updateShow(petInfo.value.id)
}
</script>
<template>
    <div class="publish-card">
        <div class="card-header">
            <div class="details-pet">
                <span>宠物：</span>{{ petInfo.name }}
                <span>雌雄：</span>{{ petInfo.gender }}
                <span>年龄：</span>{{ petInfo.age }}
                <span> 状态：</span>{{ petInfo.status === 'available' ? '可领养' : '已领养' }}
            </div>
            <div class="operation">
                <el-button type="success" @click="handleShow">{{ showList ? "隐藏" : "查看申请列表" }}</el-button>
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </div>
        </div>
        <div class="card-body" v-show="showList">
            <div class="border-box"></div>
            <userAdoptList :petAdopt="petAdopt" @changeStatus="handleChangeStatus($event)" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.publish-card {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 12px;
}

.card-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
}

.border-box {
    height: 2px;
    width: 100%;
    background-color: @primary-color;
    border-radius: 10px;
}

.card-body {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.operation {
    margin-right: 20px;
}

.details-pet {
    display: flex;

    &>span {
        font-weight: bold;
        color: #929191;
        margin-left: 20px;
    }
}
</style>