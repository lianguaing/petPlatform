<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const confirm = () => {
    //清除用户数据
    userStore.clearUserInfo();
    //跳转登录页面
    router.replace({ path: "/login" });
};
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="userStore.userInfo.id">
                    <li>
                        <a href="javascript:;" @click="$router.push('/my')"> <i class=" iconfont icon-user"></i>{{
                            userStore.userInfo.id }}</a>
                    </li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <a href="javascript:;" @click="$router.push('/login')">请先登录</a>
                    </li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="less">
.app-topnav {
    background: @primary-color;
    border-radius: 15px;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #7a7878;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: #fff;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>