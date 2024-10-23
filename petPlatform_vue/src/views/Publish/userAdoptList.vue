<script setup>
import { ref } from 'vue'
const props = defineProps({
    petAdopt: {
        type: Array,
    }
})
const emit = defineEmits(['changeStatus'])

const change = ref(false)
function handelChange(flag) {
    const flag1 = flag[0]
    if (flag1) {
        change.value = '已同意'
    } else {
        change.value = '已拒绝'
    }
    emit('changeStatus', flag)
}
</script>
<template>
    <div class="adopt-pet-list">
        <span>申请人列表</span>
        <div class="list-item" v-for="item in props.petAdopt" :key="item.id">
            <div class="details">
                <span>用户账号：</span>{{ item.User.id }}<br>
                <span>用户昵称：</span>{{ item.User.name }}<br>
                <span>联系方式：</span>{{ item.User.contact_info }}<br>
                <span> 描述：</span>
                <div class="description">
                    {{ item.message }}
                </div>
            </div>
            <div class="operation">
                <!-- 完成状态 -->
                <el-button v-if="item.status === 'approved'" type="success" size="small">已同意</el-button>
                <el-button v-if="item.status === 'rejected'" type="warning" size="small">已拒绝</el-button>
                <!-- 处理状态 -->
                <el-popconfirm @confirm="handelChange([true, item.id, item.User.id])"
                    title="确认同意该用户领养吗？同意后自动拒绝其他用户，不可更改" confirm-button-text="确认" cancel-button-text="取消"
                    v-if="item.status === 'pending'">
                    <template #reference>
                        <el-button type="success" size="small">同意</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm @confirm="handelChange([false, item.id, item.User.id])" title="确认拒绝该用户领养吗？拒绝后不可更改"
                    confirm-button-text="确认" cancel-button-text="取消" v-if="item.status === 'pending'">
                    <template #reference>
                        <el-button type="danger" size="small">拒绝</el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.adopt-pet-list {
    width: 100%;
    height: auto;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    font-size: 14px;
}

.list-item {
    font-size: 12px;
    padding: 10px;
    margin: 10px 2px;
    border: 2px solid rgb(179, 228, 237);
    border-radius: 10px;
    background-color: rgb(220, 240, 249);
    display: flex;
    justify-content: space-between;
}

.details {
    max-width: 1000px;

    &>span {
        font-weight: bold;
        color: #929191;
    }

}

.description {
    background-color: #fdfdfd;
    border-radius: 12px;
    padding: 10px;
    margin-left: 30px;
}

.operation {
    display: flex;
}
</style>