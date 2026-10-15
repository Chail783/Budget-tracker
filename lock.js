const lockScreen = document.getElementById("lock-screen");
const appArea = document.getElementById("app");
const lockName = document.getElementById("lock-name");
const lockPin = document.getElementById("lock-pin");
const lockBtn = document.getElementById("lock-btn");
const lockMessage = document.getElementById("lock-message");
const lockError = document.getElementById("lock-error");

function getProfile() {
  const saved = localStorage.getItem("profile");
  return saved ? JSON.parse(saved) : null;
}

function unlock(profile) {
  lockScreen.classList.add("hidden");
  appArea.classList.remove("hidden");
  document.querySelector(".top p").textContent = "Welcome back, " + profile.name + "!";
  window.dispatchEvent(new Event("resize"));
}

const existingProfile = getProfile();
if (existingProfile) {
  lockMessage.textContent = "Welcome back, " + existingProfile.name + "! Enter your PIN.";
  lockName.classList.add("hidden");
}

lockBtn.addEventListener("click", function () {
  const profile = getProfile();
  const pin = lockPin.value;

  if (!/^\d{4}$/.test(pin)) {
    lockError.textContent = "The PIN must be exactly 4 digits.";
    return;
  }

  if (profile) {
    if (pin === profile.pin) {
      unlock(profile);
    } else {
      lockError.textContent = "Wrong PIN. Try again.";
      lockPin.value = "";
    }
  } else {
    const name = lockName.value.trim();
    if (name === "") {
      lockError.textContent = "Please enter your name.";
      return;
    }
    const newProfile = { name: name, pin: pin };
    localStorage.setItem("profile", JSON.stringify(newProfile));
    unlock(newProfile);
  }
});