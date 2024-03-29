const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
shareBtn.addEventListener("click", handleShare);
sizes.addEventListener("change", handleSize);

const defaultUrl = "https://github.com/Engsheet/javascript-programming";
let text = defaultUrl;
let colorLight = "#fff";
let colorDark = "#000";
let size = 300;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}

function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}

function handleQRText(e) {
  const value = e.target.value;
  text = value;

  if (!value) {
    text = defaultUrl;
  }

  generateQRCode();
}

async function generateQRCode() {
  qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark,
  });
  download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRcode.png", {
        type: blob.type,
      });
      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("입력하신 페이지는 공유를 지원하지 않습니다.");
    }
  }, 100);
}

function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}

generateQRCode();
