const profReviewData = {};
var hasLoaded = false;

//insert things here, including modules and other stuff
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg.professorName)
    if (msg.text == 'getProfessorData') {
        // get the professor name
        const professorData = getProfData(msg.professorName);
        // const professorData = {
        //     rating: "4.5",
        //     difficulty: "3.0",
        //     workload: "5.0",
        //     comments: "Great professor!"
        // };
        sendResponse(professorData);
    }
  });

const getProfData = (professorName) => {
    // Send a message to the background script
    console.log("getting data for ", professorName);
    if (!hasLoaded) 
        loadProfData();

    return profReviewData[professorName];
}

const loadProfData = () => {
    hasLoaded = true;
    console.log("loading data");
    const fileUrl = chrome.runtime.getURL('ratemydata/dump3.json');
    console.log(fileUrl);
    fetch(fileUrl)
        .then(response => {
          console.log(response);
          return response.json()})
        .then(data => {
            data.forEach((prof) => {
                const rating = prof[0];
                const ratingCount = prof[1];
                const profName = prof[2];
                const department = prof[3];
                const university = prof[4];
                const wouldTakeAgain = prof[5];
                const difficulty = prof[6];
                profReviewData[profName] = {
                    profName,
                    rating,
                    ratingCount,
                    department,
                    university,
                    wouldTakeAgain,
                    difficulty
                };
            });
            console.log(profReviewData);
            return profReviewData;
        })
        .catch(error => {
            console.log('Error:', error);
            return error;
        });
        
}


//   ,
//       {
//         "matches": ["https://planner.wpi.edu/*"],
//         "js": ["findName.js"]
//       }