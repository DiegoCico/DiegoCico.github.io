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

let currentText = ""; // Currently displayed text
let charIndex = 0; // Index for characters in a word
let typing = true; // Flag to indicate typing/deleting
let recentIndices = []; // Queue to track the last 3 used indices

function getRandomIndex() {
  // Create a pool of valid indices excluding recent ones
  const availableIndices = textArray
    .map((_, index) => index)
    .filter(index => !recentIndices.includes(index));
  
  // Pick a random index from the available pool
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  
  // Update recent indices queue
  recentIndices.push(randomIndex);
  if (recentIndices.length > 3) {
    recentIndices.shift(); // Remove the oldest index
  }

  return randomIndex;
}

function typeEffect() {
  if (typing) {
    // Typing effect
    if (charIndex < currentText.length) {
      dynamicText.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 90); // Speed of typing
    } else {
      typing = false;
      setTimeout(typeEffect, 1200); // Pause after typing the word
    }
  } else {
    // Deleting effect
    if (charIndex > 0) {
      dynamicText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 50); // Speed of deleting
    } else {
      typing = true;
      currentText = textArray[getRandomIndex()]; // Pick a new random word
      setTimeout(typeEffect, 500); // Pause before typing the next word
    }
  }
}

// Initialize with the first random text
currentText = textArray[getRandomIndex()];
typeEffect();
