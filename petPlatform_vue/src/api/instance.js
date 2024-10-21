import axios from "axios";

function instanceFactory(url) {
  const isDev = process.env.NODE_ENV === "production"; // 判断是否是生产环境
  let urlCopy = isDev ? "" : url;

  const instance = axios.create({
    baseURL: urlCopy,
    timeout: 5000,
  });

  instance.interceptors.request.use(
    async (config) => {
      //
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );

  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res.data; // 直接返回响应数据
    },
    async (err) => {
      console.log(err.response.data);
      return Promise.reject(err);
    }
  );
  return instance;
}
//开发环境
const instance = instanceFactory("http://localhost:3000");

export default instance;
