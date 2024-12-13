const dynamicText = document.getElementById('dynamic-text');

// Array of text options
const textArray = [
  "a Software Engineer",
  "a Full Stack Developer",
  "a Data Engineer at Supply Trace",
  "an Intern at Amazon",
  "a Manager at Code Ninjas",
  "a snowboarder!",
  "a #LikeAHusky (Northeastern Mojo)",
  "a skater!",
  "an Intern at PinBank Brazil"
];

let currentText = ""; // Currently displayed text
let charIndex = 0; // Index for characters in a word
let typing = true; // Flag to indicate typing/deleting

function getRandomIndex() {
  // Get a random index for the text array
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * textArray.length);
  } while (textArray[randomIndex] === currentText); // Ensure it's not the same as the current text
  return randomIndex;
}

function typeEffect() {
  if (typing) {
    // Typing effect
    if (charIndex < currentText.length) {
      dynamicText.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 80); // Speed of typing
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
