<template>
    <div class="user-center">
        <div class="user-info">

            <div class="user-info-image">
                <img class="default-image" :src="imgUrl" alt="" @click="triggerFileInput">
                <input type="file" @change="handleFileChange" accept="image/*" ref="fileInput" style="display: none;" />
            </div>
            <div class="user-info-item">
                <el-button @click="uploadFile" type="primary" size="small">上传头像</el-button>
            </div>
            <div class="user-info-item">
                <div class="user-info-name">账号</div>
                <el-input style="width: 300px;" v-model="userInfo.id" disabled placeholder="Please input" />
            </div>
            <div class="user-info-item">
                <div class="user-info-name">用户名</div>
                <el-input style="width: 300px;" v-model="userInfo.name" placeholder="Please input" />
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
                <el-input style="width: 300px;" v-model="userInfo.contact_info" placeholder="Please input" />
            </div>
            <div class="user-info-item">
                <el-popconfirm @confirm="confirm" title="确认修改信息吗?" confirm-button-text="确认" cancel-button-text="取消">
                    <template #reference>
                        <el-button type="primary">保存</el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "@/stores/userStore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { updateAvatar } from '@/api/api';
import { ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();
const userInfo = reactive({
    id: userStore.userInfo.id,
    name: userStore.userInfo.name,
    gender: userStore.userInfo.gender,
    contact_info: userStore.userInfo.contact_info,
    avatar_url: userStore.userInfo.avatar_url
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
//图片处理
const defaultImage = userStore.userInfo.gender === 'female' ? '../../../public/image/female.png' : '../../../public/image/male.jng'
const imgUrl = ref(userStore.userInfo.avatar_url || defaultImage)

const fileInput = ref(null)
const fileRef = ref(null)

const triggerFileInput = () => {
    fileInput.value.click();// 触发文件选择
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // 限制文件大小，最大为 5MB
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
        ElMessage.warning("文件大小不能超过5MB")
        return
    }

    // 限制文件类型，只允许图片类型
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
        ElMessage.warning("只能上传 JPG/PNG/GIF 图片")
        return
    }

    //预览图片url
    imgUrl.value = URL.createObjectURL(file)

    // 上传文件
    fileRef.value = file
}

const uploadFile = async () => {
    const file = fileRef.value
    if (!file) {
        ElMessage.warning('不可上传空文件！')
        return
    }
    const formData = new FormData();
    formData.append("file", file); // 直接将文件放入 FormData

    // 传递用户 ID（如果服务端需要）
    formData.append("user_id", userInfo.id);

    try {
        const response = await updateAvatar(formData)
        console.log("文件上传成功", response)
        //成功后要更新userStore中的头像
        response.status && userStore.updateUserAvatar(response.data.file.url)
        ElMessage.success('更新成功！')
        fileRef.value = null//清空文件
    } catch (error) {
        console.log("文件上传失败", error)
        ElMessage.warning('更新失败！')
    }
}

</script>
<style scoped lang="less">
.default-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    cursor: pointer;
}

.user-center {
    width: 100%;
    margin-top: 20px;
}

.user-info {
    text-align: center;
    background-color: #f1f1f3;
    padding-top: 20px;
    margin: 0px;
    height: 650px;
    border-radius: 15px;

    &-image {
        height: 150px;
    }

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
</style>