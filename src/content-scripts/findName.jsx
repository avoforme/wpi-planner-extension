addEventListenersToClass("permutationPeriodItem", "mouseenter", (event) => {
    const elem = event.target; 
    doThing(elem); 
});

function doThing(elem) {
    const courseNum = elem.children[0].innerText.replaceAll(" ", "");
    var courses = Array.from(document.getElementsByClassName("permutationCourseItem"));
    for(var i = 0; i < courses.length; i++){
        if (courses[i].children[0].children[0].children[1].innerText === courseNum ){
            var clicked = false;
            if(courses[i].children[0].children[0].children[0].children[0].innerText === "▶"){
                courses[i].children[0].children[0].children[0].children[0].click()
                clicked = true;
            }
            const prof = Array.from(courses[i].getElementsByClassName("gwt-CheckBox")).filter(elem => elem.parentElement.style.cssText.includes("background-color")).map(elem => elem.parentElement.children[1].innerText)
            /**CALL THINGS HERE, 'prof' is the Name of the professor. */
            console.log(prof)
            
            
            if(clicked) courses[i].children[0].children[0].children[0].children[0].click()
            break;
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