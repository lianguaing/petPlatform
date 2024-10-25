<template>
  <div class="details-body">
    <div class="text" @click="emit('callback')">返回</div>
    <div class="border-box"></div>
    <!-- 信息详情 -->
    <div class="details-main">
      <!-- 用户信息 -->
      <div class="publish-user">
        <div>信息</div>
        <div>
          <el-button v-if="petInfo?.status === 'available'" type="primary" @click="handleAdopt">申请领养</el-button>
          <span v-else>已被领养</span>
        </div>
      </div>
      <div class="border-box"></div>
      <!-- 宠物信息 -->
      <div class="details-pet">
        宠物信息
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const props = defineProps({
  petDetailInfo: {
    type: Object,
    default: () => { }
  }
})
const owner = ref(props.petDetailInfo.owner)//当前宠物的发布者信息
const petPhotos = ref(props.petDetailInfo.PetPhotos)//当前宠物的照片信息
const petInfo = ref(props.petDetailInfo)//当前宠物的信息

const emit = defineEmits(['callback']);

watch(
  () => props.petDetailInfo,
  () => {
    owner.value = props.petDetailInfo.owner
    petPhotos.value = props.petDetailInfo.PetPhotos
    petInfo.value = props.petDetailInfo
  },
  {
    deep: true
  }
)

//申请领养
async function handleAdopt() {
  console.log(userStore.userInfo.id)
}
</script>
<style lang="less" scoped>
.details-body {
  display: flex;
  flex-direction: column;
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

.publish-user {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
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
  height: 1000px;
}
</style>