<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore.js'

const userStore = useUserStore()
const router = useRouter();
const defaultImage = '../../../public/image/female.png'

const categoryList = [
    { id: 1, name: '首页', routeName: 'petHome' },
    { id: 2, name: '我的发布', routeName: 'userPublish' },
    { id: 3, name: '我的领养', routeName: 'userAdopt' },
]
const userIsExit = ref(Boolean(userStore.userInfo.id))

const handleClick = () => {
    if (userStore.userInfo.id) {
        // 跳转到个人中心
        router.push({ name: 'userCenter' });
    } else {
        router.push({ name: 'login' });
    }
}
const handleLogin = () => {
    router.push({ name: 'login' }); // 使用路由名称跳转
}
</script>

<template>
    <div class="aside">
        <!-- 个人头像 -->
        <div class="user-image" @click="handleClick">
            <img class="default-image" :src="userStore.userInfo.avatar_url || defaultImage" alt="">
            <span v-if="!userIsExit">请登录</span>
            <span v-else>{{ userStore.userInfo.id }}</span>
        </div>
        <!-- 菜单 -->
        <div class="home-category">
            <div class="menu">
                <router-link v-for="item in categoryList" :key="item.id" :to="{ name: item.routeName }">
                    <div :class="['menu-item', { 'item-active': $route.name === item.routeName }]"> {{ item.name }}
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.aside {
    width: 200px;
    background-color: @primary-color;
    border-radius: 0 15px 15px 0;
}

.user-image {
    height: 120px;
    width: 120px;
    margin: 40px;
    text-align: center;
    color: @secondary-color;
    border-radius: 50%;
    cursor: pointer;
}

.default-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.home-category {
    margin-top: 20px;
}

.menu-item {
    height: 55px;
    line-height: 55px;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: #ffffff;
        background-color: #be8ca3;
        border-radius: 10px;
    }
}

.item-active {
    color: #ffffff;
    background-color: #be8ca3;
    border-radius: 10px;
}
</style>