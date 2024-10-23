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
                <el-button v-if="item.status === 'approved'" type="success" size="small">已同意</el-button>
                <el-button v-if="item.status === 'rejected'" type="success" size="small">已拒绝</el-button>
                <el-button v-if="item.status === 'pending'" type="success" size="small"
                    @click="handelChange([true, item.id])">同意</el-button>
                <el-button v-if="item.status === 'pending'" type="danger" size="small"
                    @click="handelChange([false, item.id])">拒绝</el-button>
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