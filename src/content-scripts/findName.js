let popup = document.createElement("div");

addEventListenersToClass("permutationPeriodItem", "mouseenter", async (event) => {
  const elem = event.target; 
  const profName = removeParenthesesAtEnd(getProfName(elem)); 
  console.log(profName);
  
  if (!popup)
    popup = document.createElement("div");
  popup.innerHTML = await printProfessorInfo(profName);

  if (!popup) return;
  getProfessorInfoStyles(popup);

  const rect = elem.getBoundingClientRect();
  popup.style.top = rect.top + window.scrollY + rect.height + 10 + "px";
  popup.style.left = rect.left + window.scrollX + "px";

  document.body.appendChild(popup);
  
});

// Because the name we get will be appended with rating, and this is the easiest way to do it.
function removeParenthesesAtEnd(str) {
  return str.replace(/\s*\(.*\)$/, '');
}

addEventListenersToClass("permutationPeriodItem", "mouseleave", () => {
  console.log("mouseout");
  if (popup)
    popup.remove();
  popup = null;
});

function getProfName(elem) {
    const courseNum = elem.children[0].innerText.replaceAll(" ", "");
    var courses = Array.from(document.getElementsByClassName("permutationCourseItem"));
    for(var i = 0; i < courses.length; i++){
        if (courses[i].children[0].children[0].children[1].innerText === courseNum ){
            var clicked = false;
            if(courses[i].children[0].children.length == 1){
              if(courses[i].children[0].children[0].children[0].children[0].innerText === "▶"){
                courses[i].children[0].children[0].children[0].children[0].click()
                clicked = true;
              }
            }



            const profName = Array.from(courses[i].getElementsByClassName("gwt-CheckBox")).filter(elem => elem.parentElement.style.cssText.includes("background-color")).map(elem => elem.parentElement.children[1].innerText)
            if(clicked) courses[i].children[0].children[0].children[0].children[0].click()
            return profName[0];
        }
    }
}

// Function to dynamically add event listeners to elements of a certain class
function addEventListenersToClass(className, eventType, eventHandler) {
  // Get all elements with the specified class
  const elements = document.querySelectorAll(className);

  // Add event listener to existing elements
  elements.forEach(element => {
      element.addEventListener(eventType, eventHandler);
  });

  // Use MutationObserver to observe changes in the DOM
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // If new elements with the class are added
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains(className)) {
              node.addEventListener(eventType, eventHandler);
          }
        });
      }
    });
  });

  // Start observing the entire document for changes
  observer.observe(document.body, { childList: true, subtree: true });
}


// "content_scripts": [
//     {
//       "js": ["findName.jsx"],
//       "matches": ["https://planner.wpi.edu/*"]
//     }
//   ]


const printProfessorInfo = async (professorName) => {
  // eslint-disable-next-line no-undef
  var profData = await chrome.runtime.sendMessage({text: 'getProfessorData', professorName: professorName});
  
  if (profData)
    return `
        <div class="popup-content">
          <h4>Professor: ${profData.profName}</h4>
          <p><strong>Department:</strong> ${profData.department}</p>
          <p><strong>Rating:</strong> ${profData.rating} / 5.0</p>
          <p><strong>Ratings Count:</strong> ${profData.ratingCount}</p>
          <p><strong>Would Take Again:</strong> ${profData.wouldTakeAgain}%</p>
          <p><strong>Level of Difficulty:</strong> ${profData.difficulty}</p>
        </div>
      `;
  return "Information not available";
}

const getProfessorInfoStyles = (popup) => {
  popup.style.position = "absolute";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.padding = "15px";
  popup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.fontSize = "14px";
  popup.style.zIndex = "1000";
}
    
