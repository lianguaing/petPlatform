<script setup>

const categoryList = [
    { id: 1, name: '首页', routeName: 'petHome' },
    { id: 2, name: '发布信息', routeName: 'userPublish' },
    { id: 3, name: '领养信息', routeName: 'userAdopt' },
]
const handleClick=()=>{

}
</script>

<template>
    <div class="aside">
        <!-- 个人头像 -->
        <div class="user-image" @click="handleClick">
            <img class="default-image" src="../../../public/image/female.png" alt="" >
            <span>请登录</span>
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
    background-color: #e2c4db;
    border-radius: 0 15px 15px 0;
}

.user-image {
    height: 120px;
    width: 120px;
    margin: 40px;
    text-align: center;
    color: #9b999a;
    border-radius: 50%;
    cursor: pointer;
}

.default-image {
    width: 120px;
    height: 120px;
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