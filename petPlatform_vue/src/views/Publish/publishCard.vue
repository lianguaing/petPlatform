<script setup>
import { defineProps, reactive, ref } from 'vue';
import { getAdoptionInfoByPetId, updatePetInfo, updateAdoptionInfo } from "@/api/api"
import userAdoptList from './userAdoptList.vue';

const props = defineProps({
    pet: {
        type: Object,
        default: () => { }
    }
})
const petInfo = ref(props.pet)
const petAdoptList = ref([])

const showList = ref(false)
const handleShow = async () => {
    showList.value = !showList.value
    //根据宠物id查询申请表
    updateShow(petInfo.value.id)
}
//更新申请列表
async function updateShow(id) {
    const res = await getAdoptionInfoByPetId(id)
    petAdoptList.value = res.data.adoptionR
    console.log(petAdoptList.value)
}
//处理同意申请/拒绝申请
async function handleChangeStatus(event) {
    const flag = event[0]
    const id = event[1]
    const userId = event[2]
    if (flag) {
        // 1. 先修改申请表状态为同意
        const res = await updateAdoptionInfo(id, { status: 'approved' });

        // 2. 再修改宠物状态为已领养-领养者：xxx
        if (res.status) {
            await updatePetInfo(petInfo.value.id, { status: 'adopted', adopter_id: userId });
            // 3. 最后拒绝其他待处理的申请
            await rejectOther(id);
        }
    } else {
        //修改申请表状态为拒绝 'rejected'
        const res = await updateAdoptionInfo(id, { status: 'rejected' })
    }
    updateShow(petInfo.value.id)
}
async function rejectOther(approvedId) {
    //将其他申请领养表的状态修改为拒绝-循环调用
    // 过滤掉当前已批准的申请，避免其被误拒
    const otherRequests = petAdoptList.value.filter(req => req.id !== approvedId);

    // 处理其他 'pending' 状态的申请，将其状态改为 'rejected'
    for (let i = 0; i < otherRequests.length; i++) {
        if (otherRequests[i].status === 'pending') {
            await updateAdoptionInfo(otherRequests[i].id, { status: 'rejected' });
        }
    }
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
            <userAdoptList :petAdopt="petAdoptList" @changeStatus="handleChangeStatus($event)" />
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