const addProfessorPopup = (professorName, profData) => {
  professorName.addEventListener("mouseover", (e) => {
    const target = e.target;
    console.log("mouseover", target);
  
    // Create a div for the popup container
    let popup = document.createElement("div");
    popup.className = "hover-popup"; // Optional: Keep the class name if you prefer, but not needed for styles
  
    // Inject the HTML content directly into the popup
    popup.innerHTML = `
      <div class="popup-content">
        <h4>Professor: ${profData.profName}</h4>
        <p><strong>Department:</strong> ${profData.department}</p>
        <p><strong>Rating:</strong> ${profData.rating} / 5.0</p>
        <p><strong>Ratings Count:</strong> ${profData.ratingCount}</p>
        <p><strong>Would Take Again:</strong> ${profData.wouldTakeAgain}%</p>
        <p><strong>Level of Difficulty:</strong> ${profData.difficulty}</p>
      </div>
    `;
  
    // Apply styles directly to the popup
    popup.style.position = "absolute";
    popup.style.backgroundColor = "white";
    popup.style.border = "1px solid #ccc";
    popup.style.padding = "15px";
    popup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    popup.style.fontFamily = "Arial, sans-serif";
    popup.style.fontSize = "14px";
  
    // Apply styles to specific elements inside the popup
    const link = popup.querySelector('a');
    if (link) {
      link.style.color = "blue";
      link.style.textDecoration = "underline";
    }
  
    const heading = popup.querySelector('h4');
    if (heading) {
      heading.style.margin = "0 0 10px 0";
    }
  
    // Append the popup container to the body
    document.body.appendChild(popup);
  
    // Position the popup near the professor name
    const rect = target.getBoundingClientRect();
    popup.style.top = rect.top + window.scrollY + rect.height + 10 + "px";
    popup.style.left = rect.left + window.scrollX + "px";
  
    // Remove the popup when the mouse leaves the element
    target.addEventListener("mouseout", () => {
      popup.remove(); // Remove the popup from the DOM
    });
  });
}

var body = document.getElementsByTagName('body')[0];
const observer = new MutationObserver(mutations => {
  console.log("Mutation detected" + mutations);
  const topScheduleButton = document.getElementsByClassName('sched-TopButtonEnabled')[3];
  topScheduleButton.addEventListener("click", () => {
    console.log("Schedule button clicked");
    // once data has been loaded
    // get all elements with course item mutations
    const courseItems = document.getElementsByClassName('permutationCourseItem');
    [...courseItems].forEach((courseItem) => {
      // get the button element
      const thisButton = courseItem.getElementsByTagName("button")[0];
  
      // Find the course name
      // const courseName = getCourseName(courseItem);
  
      thisButton.addEventListener("click", () => {
        if (thisButton.innerText == "▼") {
          // get all element of professor names
          const professorNames = courseItem.getElementsByClassName('PeriodSelectProf');
          [...professorNames].forEach(professorName => {
            const profNameStr = removeParenthesesAtEnd(professorName.innerText);
            
            const onReceivedProfessorData = (professorData) => {
              const sectionNameCheckbox = professorName.parentElement.getElementsByClassName("gwt-CheckBox")[0];
              const sectionName = sectionNameCheckbox.getElementsByTagName("label")[0];
              const sectionNameStr = removeParenthesesAtEnd(sectionName.innerText);
              if (professorData) {
                sectionName.innerHTML = sectionNameStr + " (" + professorData.rating + "★)";
                addProfessorPopup(professorName, professorData);
              }
              else {
                sectionName.innerHTML = sectionNameStr + " (N/A)";
              }
            }
            // get data from service worker
            (async () => { 
              const profData = await chrome.runtime.sendMessage({text: 'getProfessorData', professorName: profNameStr});
              onReceivedProfessorData(profData);
            })();
          });
        }
      })
    });
  
  });
});

observer.observe(body, {
  childList: true, 
})

// const getCourseName = (courseItem) => {
//   var courseName = courseItem.getElementsByTagName('td')[1].innerText;
//   return courseName;
// }

const onInnerTextChange = (element, callback) => {
  // const observer = new MutationObserver(mutations => {
  //   mutations.forEach(mutation => {
  //     if (mutation.type === 'childList') {
  //       callback();
  //     }
  //   });
  // });

  // observer.observe(element, { childList: true });
}

// Because the name we get will be appended with rating, and this is the easiest way to do it.
function removeParenthesesAtEnd(str) {
  return str.replace(/\s*\(.*\)$/, '');
}