<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore.js'

const userStore = useUserStore()

const router = useRouter()

const formModel = reactive({
    id: '',
    name: '',
    password: '',
    checkPassword: ''
})
//判断是登录还是注册
const changeMessage = ref(false)
//登录或者注册处理
async function handelClick() {
    if (!changeMessage.value) {
        //登录
        if (formModel.id && formModel.password) {
            const account = formModel.id
            const password = formModel.password
            const flag = await userStore.getUserMessage({ account, password })
            if (flag) {
                ElMessage.success('登录成功!')
                router.push({ name: 'petHome' }); // 使用路由名称跳转
            } else {
                ElMessage.warning('账号或密码不正确!')
            }
        }
    } else {
        //注册
        if (formModel.password) {
            const data = { name: formModel.name, password: formModel.password }
            const flag = await userStore.registerUserMessage(data)
            if (flag) {
                ElMessage.success('注册成功 ! 将为您自动登录')
                router.push({ name: 'petHome' }); // 使用路由名称跳转
            } else {
                ElMessage.warning('注册失败!')
            }
        }
    }
}

const rules = {
    id: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 8, max: 10, message: '账号必须是8~10位的数字', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 1, max: 10, message: '账号必须是1~10位的字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '密码必须是6~15位的非空字符', trigger: 'blur' }
    ],
    repassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { pattern: /^\S{6,15}$/, message: '密码必须是6~15位的非空字符', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                // 判断 value 和当前 form 中收集的 password 是否一致
                if (value !== formModel.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback() // 就算校验成功，也需要callback
                }
            }, trigger: 'blur'
        }
    ]
}

</script>
<template>
    <el-row class="register-page">
        <!-- <el-col :span="12" class="bg"></el-col> -->
        <el-col :span="8" :offset="0" class="form">
            <el-form :model="formModel" :rules="rules" size="large" autocomplete="off">
                <el-form-item>
                    <h1>{{ changeMessage ? '注册' : '登录' }}</h1>
                </el-form-item>
                <el-form-item prop="id" v-if="!changeMessage">
                    <el-input v-model="formModel.id" :prefix-icon="User" placeholder="请输入账号"></el-input>
                </el-form-item>
                <!-- 注册才显示 -->
                <el-form-item prop="name" v-show="changeMessage">
                    <el-input v-model="formModel.name" :prefix-icon="User" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 注册才显示end -->
                <el-form-item prop="password">
                    <el-input v-model="formModel.password" :prefix-icon="Lock" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- 注册才显示 -->
                <el-form-item prop="repassword" v-show="changeMessage">
                    <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password"
                        placeholder="请输入再次密码"></el-input>
                </el-form-item>
                <!-- 注册才显示end -->
                <el-form-item>
                    <el-button @click="handelClick" class="button" type="primary" auto-insert-space>
                        {{ changeMessage ? '注册' : '登录' }}
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-button size="small" round @click="() => changeMessage = !changeMessage">{{ changeMessage ?
                        '已有账号?点击登录' : '没有账号?点击注册' }}</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.register-page {
    height: 100vh;
    background-color: #fff;
    .flex-center();

    .bg {
        width: 100%;
        height: 100%;
        background-color: #dac275;
        border-radius: 0 15px 15px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>