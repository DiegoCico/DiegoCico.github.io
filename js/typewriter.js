const dynamicText = document.getElementById('dynamic-text');

// Text options (tiny grammar fix: "An Innovator")
const textArray = [
  "A Software Engineer",
  "A Full Stack Developer",
  "A Data Engineer at Supply Trace",
  "A Product Manager at Supply Trace",
  "An Intern at Amazon",
  "A Manager at Code Ninjas",
  "A Snowboarder",
  "A #LikeAHusky (Northeastern Mojo)",
  "A Chef",
  "A Wakeboarder",
  "A Car Enthusiast",
  "A Freelance Developer",
  "An Intern at PinBank Brazil",
  "An Open-Source Contributor",
  "A Coffee/Tea Lover",
  "A Team Leader",
  "A Hackathon Enthusiast",
  "A Vacation Lover",
  "A Coding Teacher",
  "An Innovator",
  "A Problem Solver"
];

let currentText = "";
let charIndex = 0;
let typing = true;
let recentIndices = [];
let timerId = null;

function getRandomIndex() {
  // avoid recently used (last 5)
  const available = textArray
    .map((_, i) => i)
    .filter(i => !recentIndices.includes(i));
  const randomIndex = available[Math.floor(Math.random() * available.length)];

  recentIndices.push(randomIndex);
  if (recentIndices.length > 5) recentIndices.shift();
  return randomIndex;
}

function typeEffect() {
  // safety: ensure only one timeout chain runs
  if (timerId) clearTimeout(timerId);

  if (typing) {
    if (charIndex < currentText.length) {
      dynamicText.textContent += currentText.charAt(charIndex);
      charIndex++;
      timerId = setTimeout(typeEffect, 25);
    } else {
      typing = false;
      timerId = setTimeout(typeEffect, 1000); // pause fully typed
    }
  } else {
    if (charIndex > 0) {
      dynamicText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      timerId = setTimeout(typeEffect, 5);
    } else {
      // about to start a new one → CLEAR first so nothing else shows
      dynamicText.textContent = "";
      typing = true;
      currentText = textArray[getRandomIndex()];
      timerId = setTimeout(typeEffect, 300);
    }
  }
}

// Initialize with the first text (clear first!)
dynamicText.textContent = "";
currentText = textArray[getRandomIndex()];
typeEffect();
