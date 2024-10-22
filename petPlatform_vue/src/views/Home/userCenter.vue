<template>
    <div class="user-center">
        <div class="user-info">
            <div class="user-info-item">
                <div class="user-info-name">账号</div>
                <el-input v-model="userInfo.id" disabled placeholder="Please input" />
            </div>
            <div class="user-info-item">
                <div class="user-info-name">用户名</div>
                <el-input v-model="userInfo.name" placeholder="Please input" />
            </div>
            <div class="user-info-item">
                <el-radio-group v-model="userInfo.gender">
                    <el-radio value="female">女生</el-radio>
                    <el-radio value="male">男生</el-radio>
                    <el-radio value="other">其他</el-radio>
                </el-radio-group>
            </div>
            <div class="user-info-item">
                <div class="user-info-name">联系方式</div>
                <el-input v-model="userInfo.contact_info" placeholder="Please input" />
            </div>
            <div class="user-info-item">
                <el-popconfirm @confirm="confirm" title="确认修改信息吗?" confirm-button-text="确认" cancel-button-text="取消">
                    <template #reference>
                        <el-button type="primary">更新</el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "@/stores/userStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const userInfo = reactive({
    id: userStore.userInfo.id,
    name: userStore.userInfo.name,
    gender: userStore.userInfo.gender,
    contact_info: userStore.userInfo.contact_info
});
router.beforeEach((to, from, next) => {
    Object.assign(userInfo, userStore.userInfo);
    next(); // 继续导航
});
async function confirm() {
    const obj = {
        name: userInfo.name,
        gender: userInfo.gender,
        contact_info: userInfo.contact_info
    }
    const flag = await userStore.updateUserMessage(userInfo.id, obj)
    if (flag) {
        ElMessage.success('修改信息成功！')
    } else {
        ElMessage.error('修改信息失败！')
    }
}
</script>
<style scoped lang="less">
.user-center {
    width: 100%;
    margin-top: 20px;
}

.user-info {
    text-align: center;
    background-color: #f1f1f3;
    padding: 0px;
    margin: 0px;
    height: 650px;
    border-radius: 15px;

    &-item {
        display: flex;
        height: 30px;
        justify-content: center;
        margin-bottom: 20px
    }

    &-name {
        margin-right: 20px;
        width: 200px;
        line-height: 30px;
    }
}
</style>