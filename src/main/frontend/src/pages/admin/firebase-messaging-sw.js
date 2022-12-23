
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyC5QRvCdjjO6Kz3impRMn7x8ZccnP1k5uU",
    authDomain: "devs-7997e.firebaseapp.com",
    projectId: "devs-7997e",
    storageBucket: "devs-7997e.appspot.com",
    messagingSenderId: "329139682585",
    appId: "1:329139682585:web:bd76fd7a8b8164bb955988",
    measurementId: "G-B6GPL16KRV"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: "BFeBGN_3TjEG8fr_n8L3kf6Vvy7S3y9okeIADHJeI5j5moroNz8gx0RWnaYL3jcVSakOgcL7xqEjWIVU_5COuzo"
  });

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();