<template>
  <div class="details-body">
    <div class="text" @click="emit('callback')">返回</div>
    <div class="border-box"></div>
    <!-- 信息详情 -->
    <div class="details-main">
      <!-- 用户信息 -->
      <div class="publish-user">
        <div class="owner-card">
          <img class="default-image" :src="owner?.avatar_url" alt="">
          <div class="owner-info">
            <div><span>账号：</span>{{ owner?.id }}</div>
            <div><span>昵称：</span>{{ owner?.name }}</div>
            <div><span>性别：</span>{{ owner?.gender === 'male' ? '男' : '女' }}</div>
            <div><span>联系方式：</span>{{ owner?.contact_info }}</div>
          </div>
        </div>
        <div class="operation-btn">
          <el-button v-if="petInfo?.status === 'available' && owner?.id !== userStore.userInfo.id && !isAdopted"
            type="primary" @click="handleAdopt">申请领养</el-button>
          <el-button v-if="owner?.id === userStore.userInfo.id" type="success">我的发布</el-button>
          <el-button v-if="isAdopted" type="success">您已申请</el-button>
          <el-button v-if="petInfo?.status === 'adopted'" type="success">已被领养</el-button>
        </div>
      </div>
      <!-- 用户信息end -->
      <div class="border-box"></div>
      <!-- 宠物信息 -->
      <div class="details-pet">
        <span>基本信息</span>
        <div>
          <div><span>宠物昵称：</span>{{ petInfo?.name }}</div>
          <div><span>宠物性别：</span>{{ petInfo?.gender === 'male' ? '雄' : '雌' }}</div>
          <div><span>宠物年龄：</span>{{ petInfo?.age }}</div>
          <div><span>宠物品种：</span>{{ petInfo?.breed }}</div>
          <div><span>宠物物种：</span>{{ petInfo?.species }}</div>
        </div>
        <span>宠物描述</span>
        <div>
          {{ petInfo?.description }}
        </div>
        <span>生活照片</span>
        <div></div>
      </div>
    </div>
  </div>
  <!-- 描述框 -->
  <addAdopt v-show="showAddAdopt" @update:show="showAddAdopt = false" :petId="props.petDetailInfo.id" />
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useUserStore } from "@/stores/userStore";
import addAdopt from '../Adopt/addAdopt.vue';
import { useAdoptStore } from '@/stores/adoptStore'

const adoptStore = useAdoptStore();

const showAddAdopt = ref(false);//是否显示申请领养表单

const userStore = useUserStore();

const props = defineProps({
  petDetailInfo: {
    type: Object,
    default: () => { }
  }
})
const emit = defineEmits(['callback']);

//判断用户是否领养过该宠物
const isAdopted = ref(false);
const owner = ref(props.petDetailInfo.owner)//当前宠物的发布者信息
const petPhotos = ref(props.petDetailInfo.PetPhotos)//当前宠物的照片信息
const petInfo = ref(props.petDetailInfo)//当前宠物的信息

//更新详情页信息
watch(
  () => props.petDetailInfo,
  () => {
    owner.value = props.petDetailInfo.owner
    petPhotos.value = props.petDetailInfo.PetPhotos
    petInfo.value = props.petDetailInfo
    //判断用户是否领养过该宠物
    isAdopted.value = Object.values(adoptStore.adoptInfo).some(item => item.pet_id === props.petDetailInfo.id);
  },
  {
    deep: true
  }
)

//申请领养
async function handleAdopt() {
  //是否登录
  if (!userStore.userInfo.id) {
    ElMessage.warning('请先登录')
    return
  }
  showAddAdopt.value = true
}
</script>
<style lang="less" scoped>
.details-body {
  display: flex;
  flex-direction: column;
}

.default-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 30px
}

.owner {
  &-card {
    display: flex;
  }

  &-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px;
  }

}

.text {
  font-size: 30px;
  font-weight: 600;
  color: @primary-color;
  margin-top: 20px;
  margin-left: 20px;
  cursor: pointer;
}

.border-box {
  height: 2px;
  width: 100%;
  background-color: @primary-color;
  margin-top: 20px;
  border-radius: 10px;
}

.operation-btn {
  margin-top: 120px;
}

.publish-user {
  width: 100%;
  height: 200px;
  background-color: #fdebf7;
  color: #4b4b4b;
  margin: 20px 0;
  padding: 12px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
}

.details-main {
  height: 80vh;
  overflow: auto;
}

.details-pet {
  display: flex;
  height: 1000px;
  flex-direction: column;
  padding: 10px;
  background-color: #f9f3f7;
  border-radius: 20px;

  &>div {
    height: auto;
    margin: 5px 0 20px 0;
    border-radius: 20px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    padding: 10px;
    color: #686567;
  }
}
</style>