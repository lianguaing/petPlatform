<template>
    <div class="overlay">
        <div class="modal">

            <header class="modal-header">
                <h3>请录入宠物信息</h3>
                <button class="close-btn" @click="close">×</button>
            </header>
            <div class="modal-body">
                <!-- 内容 -->
                <div class="form-group">
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物昵称</div>
                        <el-input style="width: 300px;" v-model="petInfo.name" placeholder="请输入昵称" />
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物年龄</div>
                        <el-input style="width: 300px;" v-model="petInfo.age" placeholder="请输入年龄/岁" />
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name" style="margin-right: 80px;">宠物性别</div>
                        <el-radio-group v-model="petInfo.gender" style="width: 245px;">
                            <el-radio value="female">雌</el-radio>
                            <el-radio value="male">雄</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物物种</div>
                        <el-input style="width: 300px;" v-model="petInfo.species" placeholder="请输入物种" />
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物品种</div>
                        <el-input style="width: 300px;" v-model="petInfo.breed" placeholder="请输入品种（如狸花猫）" />
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物描述</div>
                        <el-input v-model="petInfo.description" style="width: 300px" :rows="5" type="textarea"
                            placeholder="请输入您的宠物描述（如已经绝育、健康状态、是否需要额外照顾等）" />
                    </div>
                    <div class="pet-info-item">
                        <div class="pet-info-name">宠物标签</div>
                        <el-input v-model="petInfo.tags" style="width: 300px" :rows="5" type="textarea"
                            placeholder="请输入您的宠物标签（如聪明、活泼等）" />
                    </div>
                </div>
                <!-- 按钮 -->
                <button class="modal-btn" @click="publishPet">发布</button>
            </div>
            <footer class="modal-footer">
                <button class="modal-btn" @click="close">关闭</button>
            </footer>

        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { addPetInfo } from '@/api/api'
import { useUserStore } from "@/stores/userStore";

const emit = defineEmits(['update:show', 'updatePet']);
//关闭窗口
function close() {
    emit('update:show');
}
//获取当前登录用户的id
const userStore = useUserStore();
//宠物信息
const petInfo = reactive({
    name: '',
    age: '',
    gender: 'female',
    breed: '',
    description: '',
    tags: '',
    species: '',
    user_id: userStore.userInfo.id
})

//发布宠物信息
async function publishPet() {
    const flag = petInfo.name && petInfo.age && petInfo.breed && petInfo.description && petInfo.tags && petInfo.species
    if (!flag) {
        ElMessage.warning('请填写完整信息')
        return
    }
    const res = await addPetInfo(petInfo);
    if (res.status) {
        ElMessage.success('发布成功!')
        //刷新主页列表
        emit('updatePet')
    } else ElMessage.warning('发布失败')
}
</script>

<style scoped lang="less">
.form-group {
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.pet-info {
    text-align: center;
    background-color: #f1f1f3;
    padding-top: 20px;
    margin: 20px;
    height: auto;
    border-radius: 15px;

    &-item {
        display: flex;
        height: auto;
        justify-content: center;
        margin-bottom: 30px;
    }

    &-name {
        margin-right: 20px;
        width: 100px;
        line-height: 30px;
    }
}

/* 蒙层样式 */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* 弹窗样式 */
.modal {
    background-color: white;
    width: 1000px;
    height: 600px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
}

/* 弹窗头部样式 */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

/* 弹窗内容样式 */
.modal-body {
    margin-bottom: 20px;
    height: 450px;
    overflow: auto;
    background-color: aliceblue;
    border-radius: 12px;
}

/* 弹窗底部样式 */
.modal-footer {
    text-align: right;
}

.modal-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.modal-btn:hover {
    background-color: #0056b3;
}
</style>