<template>
    <div class="overlay">
        <div class="modal">

            <header class="modal-header">
                <h3>请输入申请信息</h3>
                <button class="close-btn" @click="close">×</button>
            </header>
            <div class="modal-body">
                <!-- 内容 -->
                <div class="form-group">
                    <div class="pet-info-item">
                        <div class="pet-info-name">您的申请描述</div>
                        <el-input v-model="adoptInfo.message" style="width: 400px" :rows="5" type="textarea"
                            placeholder="请输入您的申请留言" />
                    </div>
                </div>
                <!-- 按钮 -->
                <button class="modal-btn" @click="handleAdopt">申请</button>
            </div>
            <footer class="modal-footer">
                <button class="modal-btn" @click="close">关闭</button>
            </footer>

        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useUserStore } from "@/stores/userStore";
import { addAdoptionInfo } from '@/api/api'
import { useAdoptStore } from '@/stores/adoptStore'
const adoptStore = useAdoptStore();

const props = defineProps({
    petId: {
        type: Number
    }
})

const emit = defineEmits(['update:show', 'updatePet']);
//关闭窗口
function close() {
    emit('update:show');
}
//获取当前登录用户的id
const userStore = useUserStore();

const adoptInfo = reactive({
    user_id: userStore.userInfo.id,
    pet_id: props.petId,
    message: ''
})
watch(() => props.petId, () => {
    adoptInfo.pet_id = props.petId
})
//发布宠物信息
async function handleAdopt() {
    console.log(adoptInfo)
    if (!adoptInfo.message) {
        ElMessage.warning('请填写完整信息')
        return
    }
    const res = await addAdoptionInfo(adoptInfo);
    if (res.status) {
        ElMessage.success('申请成功!')
        adoptStore.getAdoptMessage();//刷新申请信息
    } else ElMessage.warning('申请失败')
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
    width: 800px;
    height: 400px;
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
    height: 250px;
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