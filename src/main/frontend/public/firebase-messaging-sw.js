this.addEventListener("install", function (e) {
  console.log("fcm sw install..");
this.skipWaiting();
});

this.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

this.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  this.registration.showNotification(notificationTitle, notificationOptions);
});

this.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(this.clients.openWindow(url));
});


