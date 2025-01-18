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
            const profNameStr = professorName.innerText;
            console.log(profNameStr);
            
            const onReceivedProfessorData = (professorData) => {
              console.log("oisajfodi");
              // const sectionNameCheckbox = profNameStr.getElementsByClassName("gwt-CheckBox")[0];
              // const sectionName = sectionNameCheckbox.getElementsByTagName("label")[0];
              
              professorName.innerText = professorName.innerText + " (" + professorData.rating + ")";
            }
            
            // get data frrom service worker

            (async () => {
              var profData = await chrome.runtime.sendMessage({text: 'getProfessorData', professorName: profNameStr});
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