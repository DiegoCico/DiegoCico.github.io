const dynamicText = document.getElementById('dynamic-text');

// Array of text options
const textArray = [
  "A Software Engineer",
  "A Full Stack Developer",
  "A Data Engineer at Supply Trace",
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
];

let currentText = "";
let charIndex = 0;
let typing = true;
let recentIndices = [];

function getRandomIndex() {
  const availableIndices = textArray.map((_, index) => index).filter(index => !recentIndices.includes(index));
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

  recentIndices.push(randomIndex);
  if (recentIndices.length > 5) recentIndices.shift();

  return randomIndex;
}

function typeEffect() {
  if (typing) {
    if (charIndex < currentText.length) {
      dynamicText.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 25); // Adjust speed for readability on mobile
    } else {
      typing = false;
      setTimeout(typeEffect, 1000); // Pause for readability
    }
  } else {
    if (charIndex > 0) {
      dynamicText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 5); // Slightly faster deleting speed
    } else {
      typing = true;
      currentText = textArray[getRandomIndex()];
      setTimeout(typeEffect, 300);
    }
  }
}

// Initialize with the first text
currentText = textArray[getRandomIndex()];
typeEffect();
