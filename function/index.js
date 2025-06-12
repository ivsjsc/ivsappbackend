import express from "express";
import { initializeApp, cert } from "firebase-admin/app"; // Import cert để sử dụng service account key
import { getAppCheck } from "firebase-admin/app-check";

// Import tệp khóa tài khoản dịch vụ của bạn
// Đảm bảo đường dẫn chính xác đến tệp JSON bạn đã tải xuống
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" }; // Thêm assert { type: "json" } cho ES Modules

const expressApp = express();

// Khởi tạo Firebase Admin SDK
const firebaseApp = initializeApp({
  credential: cert(serviceAccount), // Sử dụng khóa tài khoản dịch vụ để xác thực
  // Bạn cũng có thể thêm databaseURL nếu bạn dùng Realtime Database
  // databaseURL: "https://ivs-b9eb6.firebaseio.com"
});

// Middleware để xác minh App Check Token
const appCheckVerification = async (req, res, next) => {
    const appCheckToken = req.header("X-Firebase-AppCheck");

    if (!appCheckToken) {
        res.status(401);
        return next("Unauthorized - Missing App Check Token");
    }

    try {
        // Sử dụng getAppCheck() từ firebase-admin
        const appCheckClaims = await getAppCheck().verifyToken(appCheckToken);
        // Nếu verifyToken() thành công, tiếp tục với middleware tiếp theo
        return next();
    } catch (err) {
        console.error("App Check verification failed:", err);
        res.status(401);
        return next("Unauthorized - Invalid App Check Token");
    }
};

// Ví dụ về API endpoint được bảo vệ bởi App Check
expressApp.get("/yourApiEndpoint", [appCheckVerification], (req, res) => {
    // Xử lý yêu cầu API ở đây
    res.status(200).send("Hello from your secured API!");
});

// Khởi động server Express
const PORT = process.env.PORT || 3000;
expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});