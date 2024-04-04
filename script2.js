const imagesContainer = document.getElementById("images-container");

// Function to generate image elements with random indexes
const generateRandomImages = (count, maxIndex) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * maxIndex) + 1; // Generate random index
    const img = document.createElement("img");
    img.className = "image";
    img.dataset.index = randomIndex - 1; // Adjust index to start from 0
    img.dataset.status = "inactive";
    img.src = `photos/ (${randomIndex}).jpg`; // Assuming your image files are named sequentially
    fragment.appendChild(img);
  }
  return fragment;
};

// Number of images you want to add
const numberOfImages = 20; // Change this according to your requirement
const maxIndex = 202; // Change this to the maximum index of your images

// Generate and append random image elements
imagesContainer.appendChild(generateRandomImages(numberOfImages, maxIndex));

// Rest of your JavaScript code goes here...

