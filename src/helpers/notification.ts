import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export async function checkNotificationPermission(): Promise<boolean> {
  const permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    return permission === "granted";
  }
  return true;
}

export async function sendPrayerNotification(
  prayerName: string
): Promise<void> {
  try {
    const permissionGranted = await checkNotificationPermission();
    if (permissionGranted) {
      sendNotification({
        title: "Prayer Time Alert",
        body: `It's time for ${prayerName} prayer`,
        icon: "icon.png",
      });
    }
  } catch (error) {
    console.error("Notification failed:", error);
  }
}
