let currentAngle = 90;
let gravity = 9.8;
let antiGravity = false;


function getRandomAngle() {
  // 70% chance to fall near Newton’s head
  if (Math.random() < 0.7) {
    return 85 + Math.random() * 10; // angle between 85–95°
  } else {
    return Math.floor(Math.random() * 181); // full 0–180°
  }
}


function dropApple() {
  const apple = document.getElementById("apple");
  const crying = document.getElementById("crying");
  const angleDisplay = document.getElementById("angle-display");
  const resultMsg = document.getElementById("result-msg");
  const bonkSound = document.getElementById("bonk-sound");

  // Choose angle with 50% chance to bonk
  currentAngle = Math.random() < 0.5 ? 88 + Math.random() * 4 : Math.floor(Math.random() * 181);
  angleDisplay.innerText = `Angle: ${Math.round(currentAngle)}°`;

  apple.classList.remove("hidden");
  crying.classList.add("hidden");
  resultMsg.innerText = "";

  const radians = currentAngle * (Math.PI / 180);
  const xDistance = 200 * Math.cos(radians);
  const fallTime = Math.max(300, 1500 * (9.8 / gravity));

  apple.style.transition = 'none';
  apple.style.top = '250px';
  apple.style.left = '50%';
  apple.style.transform = `translateX(-50%) rotate(${Math.round(currentAngle)}deg)`;

  setTimeout(() => {
    apple.style.transition = `top ${fallTime}ms ease-in, left ${fallTime}ms ease-in`;
    apple.style.top = antiGravity ? '-200px' : '80vh';
    apple.style.left = `calc(50% + ${xDistance}px)`;

    setTimeout(() => {
      if (!antiGravity && Math.abs(currentAngle - 90) < 3) {
        // 🎯 Bonk
        bonkSound.play();
        crying.classList.remove("hidden");
        resultMsg.innerText = "BONK! You WILL have to learn gravity! 😭";
      } else {
        // 🎉 Missed Newton → Newton gets married anyway 😄
        window.location.href = "married.html";
      }
    }, fallTime);
  }, 100);
}


 


function setGravity() {
  gravity = parseFloat(document.getElementById("gravity-input").value);
}


function toggleGravityZone() {
  antiGravity = !antiGravity;
  document.getElementById("result-msg").innerText = antiGravity ? "Anti-gravity ON 🍃" : "Gravity restored 🌍";
}


function resetGame() {
  currentAngle = 90;
  gravity = 9.8;
  antiGravity = false;
  document.getElementById("gravity-input").value = 9.8;
  document.getElementById("result-msg").innerText = "Game reset! Ready to drop.";
  document.getElementById("angle-display").innerText = "Angle: --";


  const apple = document.getElementById("apple");
  apple.classList.add("hidden");
  apple.style.transition = 'none';
  apple.style.top = '250px';
  apple.style.left = '50%';


  document.getElementById("crying").classList.add("hidden");
}
    setTimeout(() => {
      if (!antiGravity && Math.abs(currentAngle - 90) < 3) {
        bonkSound.play();
        crying.classList.remove("hidden");
        resultMsg.innerText = "BONK! You WILL have to learn gravity! 😭";
      } else if (antiGravity) {
        resultMsg.innerText = "Anti-gravity zone activated! 🍃";
      } else {
        resultMsg.innerText = "You escaped learning gravity! 🎉 Be happy you don't have to learn gravity  😄";
        
        // Show a fun image here (optional)
        const image = document.createElement("img");
        image.src = "not_married.png"; // You need to place this image in your folder
        image.style.position = "absolute";
        image.style.bottom = "100px";
        image.style.left = "50%";
        image.style.transform = "translateX(-50%)";
        image.style.width = "250px";
        image.style.zIndex = "4";
        image.id = "fun-img";
        document.body.appendChild(image);

        // Hide the image after 5 seconds
        setTimeout(() => {
          const img = document.getElementById("fun-img");
          if (img) img.remove();
        }, 5000);
      }
    }, fallTime);
  