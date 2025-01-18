//insert things here, including modules and other stuff
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg.professorName)
    if (msg.text == 'getProfessorData') {
        // get the professor name
        const professorData = {
            rating: "4.5",
            difficulty: "3.0",
            workload: "5.0",
            comments: "Great professor!"
        };
        sendResponse(professorData);
    }
});