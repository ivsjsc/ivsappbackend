// Import các hàm bạn cần từ SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Thêm SDKs Firebase khác mà bạn muốn sử dụng vào đây
// Ví dụ: import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Cấu hình Firebase của ứng dụng web của bạn
// Đối với Firebase JS SDK v7.20.0 trở lên, measurementId là tùy chọn
const firebaseConfig = {
  apiKey: "AIzaSyCuiXj4gxhgaC2f9_E5B5VWVN5FMa-Xuo",
  authDomain: "ivs-b9eb6.firebaseapp.com",
  projectId: "ivs-b9eb6",
  storageBucket: "ivs-b9eb6.appspot.com", // Lưu ý: trong ảnh là firebaseapp.com, bạn có thể kiểm tra lại trên console để chắc chắn là appspot.com
  messagingSenderId: "260954624065",
  appId: "1:260954624065:web:a67610e2cf1a21301f6c0",
  measurementId: "G-FQD9Z2ND2S"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export các đối tượng app và analytics để có thể sử dụng ở các nơi khác
export { app, analytics };
// TODO: Export các dịch vụ Firebase khác đã khởi tạo ở đây
// Ví dụ: export const db = getFirestore(app);
// export const auth = getAuth(app);