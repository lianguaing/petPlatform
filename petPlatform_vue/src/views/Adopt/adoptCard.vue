<script setup>
import { defineProps, ref } from 'vue';
import { deleteAdoptionInfo, updateAdoptionInfo } from '@/api/api'
import { useAdoptStore } from '@/stores/adoptStore'
const adoptStore = useAdoptStore();

const props = defineProps({
    adopt: {
        type: Object,
        default: () => { }
    }
})
const emit = defineEmits(['update:adopt'])

const adoptInfo = ref(props.adopt)
const adoptStatusInfo = {
    'pending': '待审核',
    'adopted': '已通过',
    'rejected': '未通过'
}
const handleDelete = async () => {
    console.log(adoptInfo.value)
    adoptStore.deleteAdoptMessage(adoptInfo.value.id)
    emit('update:adopt')
    // const res = await deleteAdoptionInfo(adoptInfo.value.id)
    // if (res.status) {
    //     emit('update:adopt')
    //     ElMessage.success('删除成功')
    // } else ElMessage.error('删除失败')
}
const handleUpdate = async () => {
    adoptStore.updateAdoptMessage(adoptInfo.value.id, { message: adoptInfo.value.message })
    // const res = await updateAdoptionInfo(adoptInfo.value.id, { message: adoptInfo.value.message })
    // if (res.status) {
    //     ElMessage.success('更新成功')
    // } else ElMessage.error('更新失败')
}
</script>
<template>
    <div class="adopt-card">
        <div class="">
            <div class="details-my-adopt">
                <span>我的申请言：</span>
                <div class="my-message">
                    <el-input v-model="adoptInfo.message" style="width: 240px" :rows="2" type="textarea"
                        placeholder="Please input" />
                </div>
            </div>
            <div class="details-adopt-pet">
                <span> 状态：</span>{{ adoptStatusInfo[adoptInfo.status] }}
                <span>宠物：</span>{{ adoptInfo.Pet.name }}
                <span>雌雄：</span>{{ adoptInfo.Pet.gender === 'male' ? '雄' : '雌' }}
                <span>年龄：</span>{{ adoptInfo.Pet.age }}
                <span>品种：</span>{{ adoptInfo.Pet.breed }}
                <i>查看详情</i>
            </div>
        </div>
        <div class="operation">
            <el-button style="width: 80px;" type="primary" @click="handleUpdate">更新</el-button>
            <el-button style="width: 80px;margin:8px 0" type="danger" @click="handleDelete">撤销</el-button>
        </div>

    </div>
</template>

<style lang="less" scoped>
.adopt-card {
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: rgb(254, 236, 250);
}

.details-my-adopt {
    display: flex;
    margin-left: 10px;

    &>span {
        font-weight: bold;
        color: #929191;
    }
}

.details-adopt-pet {
    display: flex;
    margin-top: 20px;

    &>span {
        font-weight: bold;
        color: #929191;
        margin-left: 10px;
    }

    &>i {
        font-size: 10px;
        margin: 10px 0 0 10px;
        color: #929191;
    }
}

.operation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>