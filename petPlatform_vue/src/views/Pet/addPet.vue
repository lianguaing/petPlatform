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
                        <el-input style="width: 300px;" v-model="petInfo.name" placeholder="Please input" />
                    </div>
                </div>
            </div>
            <footer class="modal-footer">
                <button class="modal-btn" @click="close">关闭</button>
            </footer>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['update:show']);
//关闭窗口
function close() {
    emit('update:show');
}
const petInfo = reactive({
    name: ''
})
</script>

<style scoped lang="less">
.form-group {
    height: 1000px;
}

.pet-info {
    text-align: center;
    background-color: #f1f1f3;
    padding-top: 20px;
    margin: 0px;
    height: 650px;
    border-radius: 15px;

    &-item {
        display: flex;
        height: 30px;
        justify-content: center;
        margin-bottom: 20px;
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
    text-align: center;
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