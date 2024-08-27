const subtitle = document.getElementsByClassName("card-subtitle")[0];
const subtitle2 = document.getElementsByClassName("card-subtitle2")[0];

const createWord = (text, index) => {
  const word = document.createElement("span");
  
  word.innerHTML = `${text} `;
  
  word.classList.add("card-subtitle-word");
  
  word.style.transitionDelay = `${index * 40}ms`;
  
  return word;
}

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
const createSubtitle = text => text.split(" ").map(addWord);
createSubtitle("I'm currently recharging my batteries with pickleball and exploring Austin after a wild ride with General Motors, where I honed my skills as a software developer at their IT Innovation Center in Austin, Texas. 🚗💨 Now, I'm embracing the opportunity to explore new challenges and adventures in the tech world! Living in Austin has been a blast, and I'm excited to see what new opportunities this vibrant city will bring my way. Stay tuned—exciting things are on the horizon! 😄💻🌟");
const createWord2 = (text, index) => {
    const word = document.createElement("span");
    
    word.innerHTML = `${text} `;
    
    word.classList.add("card-subtitle-word2");
    
    word.style.transitionDelay = `${index * 40}ms`;
    
    return word;
  }
const addWord2 = (text, index) => subtitle2.appendChild(createWord2(text, index));
const createSubtitle2 = text => text.split(" ").map(addWord2);
createSubtitle2("I graduated in the spring of 2023 from Texas A&M University in College Station with a bachelor's in Computer Engineering and a minor in math! I’m into film photography 📸, playing pickleball, collecting vinyl records, exploring new cafes ☕, and hunting for cool vintage finds. If you mouse over to the right, you can check out what I'm currently up to!");
// Function to create a word element with animation effect
const createWord3 = (text, index) => {
    const word = document.createElement("span");
    
    word.innerHTML = `${text} `;
    
    word.classList.add("card-subtitle-word3");
    
    word.style.transitionDelay = `${index * 40}ms`;
    
    return word;
}

// Function to add a word to the subtitle
const addWord3 = (text, index) => subtitle3.appendChild(createWord3(text, index));

// Function to create the subtitle from a text string
const createSubtitle3 = text => text.split(" ").map(addWord3);

// Get the subtitle element and apply the effect
const subtitle3 = document.getElementsByClassName("card-subtitle3")[0];
createSubtitle3("I'll do my best to respond as soon as I am able! &#9889&#9889 Email: aambar1101@icloud.com Phone: (713) 992-1830");