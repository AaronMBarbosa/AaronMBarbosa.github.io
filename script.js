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
createSubtitle("I am currently working as a software developer for General Motors at their IT Innovation Center in Austin, Texas. &#128516 &#128187 &#128663  I am so in love with the area &#128525 and cannot wait to explore what the area and job have to offer!");
const createWord2 = (text, index) => {
    const word = document.createElement("span");
    
    word.innerHTML = `${text} `;
    
    word.classList.add("card-subtitle-word2");
    
    word.style.transitionDelay = `${index * 40}ms`;
    
    return word;
  }
const addWord2 = (text, index) => subtitle2.appendChild(createWord2(text, index));
const createSubtitle2 = text => text.split(" ").map(addWord2);
createSubtitle2("I graduated in the spring of 2023 from Texas A&M University in College Station with a bachelors in Computer Engineering and a minor in math! I enjoy photography &#128247, taking care of my cat Koko &#128568, and trying local boba places &#129483! If you mouse over to the right, you can see what I am currently up to!");