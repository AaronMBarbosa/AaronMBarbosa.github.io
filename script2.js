const imagesContainer = document.getElementById("images-container");

// Function to generate image elements
const generateImages = (count) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const img = document.createElement("img");
    img.className = "image";
    img.dataset.index = i - 1;
    img.dataset.status = "inactive";
    img.src = `photos/ (${i}).jpg`; // Assuming your image files are named sequentially
    fragment.appendChild(img);
  }
  return fragment;
};

// Number of images you want to add
const numberOfImages = 72; // Change this according to your requirement

// Generate and append image elements
imagesContainer.appendChild(generateImages(numberOfImages));

// Rest of your JavaScript code goes here...
