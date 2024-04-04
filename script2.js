const imagesContainer = document.getElementById("images-container");

// Function to generate image elements with random indexes
const generateRandomImages = (count, maxIndex) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * maxIndex) + 1; // Generate random index
    const img = document.createElement("img");
    img.className = "image";
    img.dataset.index = randomIndex - 1; // Adjust index to start from 0
    img.dataset.status = "inactive";
    img.src = `photos/${randomIndex}.jpg`; // Assuming your image files are named sequentially
    fragment.appendChild(img);
  }
  return fragment;
};

// Number of images you want to add
const numberOfImages = 20; // Change this according to your requirement
const maxIndex = 201; // Change this to the maximum index of your images

// Generate and append random image elements
imagesContainer.appendChild(generateRandomImages(numberOfImages, maxIndex));

// Array to keep track of image positions
const imagePositions = [];

// Function to track cursor movement and update image positions
const handleOnMove = e => {
  const images = document.getElementsByClassName("image");
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (image.dataset.status === "active") {
      continue; // Skip if image is already active
    }
    const position = {
      x: e.clientX + Math.random() * 20 - 10,
      y: e.clientY + Math.random() * 20 - 10
    };
    imagePositions.push(position);
    if (imagePositions.length > 5) {
      imagePositions.shift(); // Remove oldest position
    }
    updateImagePosition(image, i);
  }
};

// Function to update image position based on stored positions
const updateImagePosition = (image, index) => {
  const position = imagePositions[Math.min(index, imagePositions.length - 1)];
  image.style.left = `${position.x}px`;
  image.style.top = `${position.y}px`;
  image.style.zIndex = index;
};

// Track cursor movement
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);



