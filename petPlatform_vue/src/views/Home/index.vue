<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getPetInfo } from '../../api/api'
import petCard from '../Pet/petCard.vue'
import addPet from '../Pet/addPet.vue'
import petDetail from '../Pet/petDetails.vue'
import { init } from "@/stores/init.js";

const petList = ref({})
const showPetDetail = ref(false)
const showAddPet = ref(false);

const genderValues = [
    { value: 'male', label: '雄' },
    { value: 'female', label: '雌' },
    { value: '', label: '全部' }
]
const statusValues = [
    { value: 'adopted', label: '已领养' },
    { value: 'available', label: '未领养' },
    { value: '', label: '全部' }
]
const inputInfo = reactive({
    name: '',
    gender: '',
    breed: '',
    age: '',
    species: '',
    status: '',
})
//存储当前点击宠物详情信息
const petDetailInfo = ref({})

//查询宠物信息
async function getPets(data) {
    const pets = await getPetInfo(data)
    petList.value = pets.data.Pets
    console.log(petList.value)
}
async function handleSearch() {
    console.log(inputInfo)
    getPets(inputInfo)
}

//发布
function handlePublish() {
    //是否登录
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.userInfo.id);
    if (!user.userInfo.id) {
        ElMessage.warning('请先登录')
        return
    }
    showAddPet.value = true
}
onMounted(async () => {
    //挂载时加载宠物信息
    getPets();
    //初始化
    init();
})

//查看宠物详情
function handlePetDetail(pet) {
    changePage()

    petDetailInfo.value = pet
    console.log('当前pet', petDetailInfo.value)
}
//跳转开关
function changePage() {
    showPetDetail.value = !showPetDetail.value
}
</script>
<template>
    <!-- 首页 -->
    <section v-show="!showPetDetail">
        <div class="main">
            <div class="main-header">
                <!-- 搜索栏 -->
                <div class="search-box">
                    <el-input style="width: 150px;margin-right: 5px;" v-model="inputInfo.name"
                        placeholder="请输入宠物名"></el-input>
                    <el-input style="width: 150px;margin-right: 5px;" v-model="inputInfo.species"
                        placeholder="请输入物种"></el-input>
                    <el-input style="width: 150px;margin-right: 5px;" v-model="inputInfo.breed"
                        placeholder="请输入品种"></el-input>
                    <el-select v-model="inputInfo.gender" placeholder="雌雄" style="width: 80px;margin-right: 5px;">
                        <el-option v-for="item in genderValues" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-select v-model="inputInfo.status" placeholder="领养状态" style="width: 100px;margin-right: 5px;">
                        <el-option v-for="item in statusValues" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </div>
                <!-- 搜索栏end -->
                <!-- 发布栏 -->
                <div class="publish-box">
                    <el-button type="success" @click="handlePublish">我要发布</el-button>
                </div>
            </div>
        </div>
        <div class="border-box"></div>
        <!-- 宠物信息卡片展示 -->
        <div class="cards-box">
            <div v-for="pet in petList" :key="pet.id" class="card-item" @click="handlePetDetail(pet)">
                <petCard :pet=pet />
            </div>
        </div>
    </section>
    <!-- 详情页 -->
    <section v-show="showPetDetail">
        <petDetail @callback="changePage" :petDetailInfo="petDetailInfo" />
    </section>
    <!-- 发布宠物弹窗 -->
    <addPet v-show="showAddPet" @update:show="showAddPet = false" @updatePet="getPets" />
</template>

<style scoped lang="less">
.main {
    width: 100%;
}

.main-header {
    display: flex;
    justify-content: space-between;
    margin: 20px 20px 0 10px;
}

.border-box {
    height: 2px;
    width: 100%;
    background-color: @primary-color;
    margin-top: 20px;
    border-radius: 10px;
}

.cards-box {
    display: flex;
    flex-wrap: wrap;
    /* 自动换行 */
    gap: 15px;
    /* 卡片之间的间距 */
    margin-top: 20px;
    margin-left: 15px;
}
</style>