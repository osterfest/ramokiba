const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const button = document.getElementById("screenshot");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }, // Selfie-Kamera
            audio: false
        });
        video.srcObject = stream;
    } catch (err) {
        alert("Kamera konnte nicht gestartet werden.");
        console.error(err);
    }
}

button.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Videobild einfügen
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Rahmen einfügen
    const frame = document.getElementById("rahmen");
    const img = new Image();
    img.src = frame.src;
    img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Als Bild speichern
        const link = document.createElement("a");
        link.download = "foto.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
});

startCamera();
