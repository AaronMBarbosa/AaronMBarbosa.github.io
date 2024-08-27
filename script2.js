const container = document.body; // You can change this to any container you want to append images to
const imagesContainer = document.createElement('div');
imagesContainer.classList.add('images-container');
container.appendChild(imagesContainer);

const NUM_IMAGES = 170; // Total number of images in the folder
const IMAGE_FOLDER_PATH = 'photos/'; // Path to your image folder

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if (e.target !== homeLink && distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 15)) {
    const lead = imagesContainer.querySelector('.active');
    const tail = imagesContainer.querySelector('.inactive');

    if (lead) lead.classList.remove('active');
    if (tail) tail.classList.remove('inactive');

    const image = imagesContainer.children[globalIndex % imagesContainer.children.length];
    activate(image, e.clientX, e.clientY);
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate a shuffled array of image indices
const imageIndices = Array.from({ length: NUM_IMAGES }, (_, i) => i + 1);
shuffleArray(imageIndices);

// Function to check if image exists
const loadImage = (image, index) => {
  image.src = `${IMAGE_FOLDER_PATH}${index}.jpg`;
  image.onerror = () => {
    // Try .JPG if .jpg fails
    image.src = `${IMAGE_FOLDER_PATH}${index}.JPG`;
    image.onerror = () => {
      console.log(`Image ${index} not found with .jpg or .JPG extension.`);
      image.remove(); // Remove the image element if neither extension exists
    };
  };
}

// Dynamically load images
for (let i = 0; i < 20; i++) { // Only load the first 20 images after shuffling
  const image = new Image();
  image.classList.add('image');
  imagesContainer.appendChild(image);
  loadImage(image, imageIndices[i]);
}

// Set up the home/source-link button
const homeLink = document.getElementById('source-link');
homeLink.style.position = 'flex';
homeLink.style.zIndex = '9999';
