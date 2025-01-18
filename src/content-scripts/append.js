document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

setTimeout(() => {

  const topScheduleButton = document.getElementsByClassName('sched-TopButtonEnabled')[3];
  console.log(topScheduleButton);
  topScheduleButton.addEventListener("click", () => {
    console.log("page has been loaded");
    // once data has been loaded
    // get all elements with course item mutations
    const courseItems = document.getElementsByClassName('permutationCourseItem');
    console.log(courseItems);
    [...courseItems].forEach((courseItem) => {
      console.log('a')
      // get the button element
      const thisButton = courseItem.getElementsByTagName("button")[0];
      console.log('has button', thisButton);
  
      // Find the course name
      const courseName = getCourseName(courseItem);
  
      thisButton.addEventListener("click", () => {
        console.log('Button clicked', courseName);
        if (thisButton.innerText == "▼") {
  
          // get all element of professor names
          const professorNames = courseItem.getElementsByClassName('PeriodSelectProf');
          [...professorNames].forEach(professorName => {

            professorName.addEventListener("mouseover", (e) => {
              const target = e.target;
              console.log("mouseover", target);
            
              // Create a div for the popup container
              let popup = document.createElement("div");
              popup.className = "hover-popup"; // Optional: Keep the class name if you prefer, but not needed for styles
            
              // Inject the HTML content directly into the popup
              popup.innerHTML = `
                <div class="popup-content">
                  <h4>Professor: ${profNameStr}</h4>
                  <p><strong>Department:</strong> Mathematics</p>
                  <p><strong>University:</strong> Worcester Polytechnic Institute</p>
                  <p><strong>Rating:</strong> ${profData.rating} / 5.0</p>
                  <p><strong>Ratings Count:</strong> 143 ratings</p>
                  <p><strong>Recommendation:</strong> N/A</p>
                  <p><strong>Would Take Again:</strong> Yes</p>
                  <p><strong>Level of Difficulty:</strong> 1.9</p>
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
              popup.style.zIndex = "9999";
            
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


            const profNameStr = professorName.innerText;
            console.log(profNameStr);
            
            const onReceivedProfessorData = (professorData) => {
              console.log("oisajfodi");
              // const sectionNameCheckbox = profNameStr.getElementsByClassName("gwt-CheckBox")[0];
              // const sectionName = sectionNameCheckbox.getElementsByTagName("label")[0];
              
              professorName.innerText = professorName.innerText + " (" + professorData.rating + ")";
            }
            
            // get data frrom service worker
            let profData;
            (async () => {
              profData = await chrome.runtime.sendMessage({text: 'getProfessorData', professorName: profNameStr});
              console.log("received: ", profData);
              onReceivedProfessorData(profData);
            })();
          });
        }
      })
    });
  
  });
},
5000);

// var body = document.getElementsByTagName('body').addEventListener();
// const observer = new MutationObserver(function(mutations) {

// });

// observer.observe(body, {
//   attributes: true, 
//   attributeFilter: ['class'],
//   childList: false, 
//   characterData: false
// })



const getCourseName = (courseItem) => {
  var courseName = courseItem.getElementsByTagName('td')[1].innerText;
  return courseName;
}