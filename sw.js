self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  const msg = event.data;
  if (msg && msg.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(msg.title, {
      body: msg.body,
      vibrate: [200, 100, 200],
      tag: msg.tag || "oxygen-alert",
      renotify: true,
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientsArr) => {
      if (clientsArr.length > 0) {
        clientsArr[0].focus();
      } else {
        self.clients.openWindow("./index.html");
      }
    })
  );
});
