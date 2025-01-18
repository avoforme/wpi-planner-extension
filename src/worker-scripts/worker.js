const profReviewData = {};
var hasLoaded = false;

//insert things here, including modules and other stuff
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
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
    if (!hasLoaded) 
        loadProfData();

    return profReviewData[professorName];
}

const loadProfData = () => {
    hasLoaded = true;
    console.log("loading data");
    const fileUrl = chrome.runtime.getURL('ratemydata/dump3.json');
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
                const wouldTakeAgain = prof[4];
                const difficulty = prof[5];
                profReviewData[profName] = {
                    profName: profName,
                    rating: rating,
                    ratingCount: ratingCount,
                    department: department,
                    wouldTakeAgain: wouldTakeAgain,
                    difficulty: difficulty
                };
            });
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