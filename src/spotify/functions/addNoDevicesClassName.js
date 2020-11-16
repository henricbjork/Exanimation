export const addNoDevicesClassName = () => {
  setTimeout(() => {
    const noDevicesPTag = document.querySelector(".no-devices-msg");
    noDevicesPTag.style.color = "darkred";
  }, 1000);
}
