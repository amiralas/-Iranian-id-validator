// === Iranian National ID validator ===
function validator(val) { 
  var allDigitEqual = [
    "0000000000","1111111111","2222222222","3333333333",
    "4444444444","5555555555","6666666666","7777777777",
    "8888888888","9999999999"
  ];

  var codeMelliPattern = /^([0-9]{10})+$/;
  if (allDigitEqual.indexOf(val) != -1 || !codeMelliPattern.test(val)) {
      return false;
  }

  var chArray = Array.from(val);
  var num0 = parseInt(chArray[0]) * 10;
  var num2 = parseInt(chArray[1]) * 9;
  var num3 = parseInt(chArray[2]) * 8;
  var num4 = parseInt(chArray[3]) * 7;
  var num5 = parseInt(chArray[4]) * 6;
  var num6 = parseInt(chArray[5]) * 5;
  var num7 = parseInt(chArray[6]) * 4;
  var num8 = parseInt(chArray[7]) * 3;
  var num9 = parseInt(chArray[8]) * 2;
  var a = parseInt(chArray[9]);
  var b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
  var c = b % 11;
  return ((c < 2 && a == c) || (c >= 2 && (11 - c) == a));
}

// === UI Logic ===
const input = document.getElementById("idInput");
const btn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const defaultBg = getComputedStyle(document.body).backgroundColor;

function runValidation() {
  const raw = input.value;
  const code = raw.replace(/\D+/g, ""); // only digits

  if (!code) {
    // reset UI if empty
    result.textContent = "Please enter an ID number.";
    result.className = "result err";
    document.body.style.backgroundColor = defaultBg;
    return;
  }

  const valid = validator(code);

  if (valid) {
    result.textContent = "✅ The ID code is valid.";
    result.className = "result ok";
    document.body.style.backgroundColor = "#e6ffe6";
    launchStickers();
  } else {
    result.textContent = "❌ Invalid ID code.";
    result.className = "result err";
    document.body.style.backgroundColor = defaultBg;
  }
}


function launchStickers() {
   const stickers = ["🎉", "🎉", "🎉", "🎉", "🎉", "🎉", "🎉", "🎉", "🎉", "🎉", "🎉"];
  for (let i = 0; i < 8; i++) {
    const span = document.createElement("span");
    span.textContent = stickers[Math.floor(Math.random() * stickers.length)];
    span.style.position = "fixed";
    span.style.left = Math.random() * 100 + "vw";
    span.style.top = "100vh";
    span.style.fontSize = "1.8rem";
    span.style.opacity = "0.9";
    span.style.transition = "transform 2.5s ease-out, opacity 2.5s ease-out";
    span.style.zIndex = "9999";
    document.body.appendChild(span);

    setTimeout(() => {
      span.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
      span.style.opacity = "0";
    }, 50);

    setTimeout(() => span.remove(), 2700);
  }
}

btn.addEventListener("click", runValidation);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runValidation();
});

// === Live reset when typing ===
input.addEventListener("input", () => {
  if (input.value.trim() === "") {
    result.textContent = "Result will appear here";
    result.className = "result muted";
    document.body.style.backgroundColor = defaultBg;
  }
});
