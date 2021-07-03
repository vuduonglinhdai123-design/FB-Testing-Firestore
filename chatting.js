var db = firebase.firestore()


// function savingMess() {
//     var sender = document.querySelector('.senderName_Input').value
//     var message = document.querySelector('.message').value

//     if (message !== "" && sender !== "") {
//         db.collection("messages").add({
//             sender: sender,
//             message: message,
//             date: moment().format("YYYY-MM-DD HH:mm")
//         })
//             .then((docRef) => {
//                 console.log("Document written with ID: ", docRef.id);
//             })
//             .catch((error) => {
//                 console.error("Error adding document: ", error);
//             });
//     }
//     else {
//         console.log('Enter your message or your name');
//     }
// }

// function sending() {
//     savingMess()

//     // Get sender name and message
//     db.collection("messages").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             var senderData = doc.data()
//             var messageBox = document.querySelector('.messageBox')

//             console.log(doc.data());

//             var html = `
//             <div class="senderBox">
//                 <div class="sender-name">${senderData.sender} :</div>
//                 <div class="sender-message">${senderData.message}</div>
//             </div>    
//             `
//             messageBox.innerHTML += html
//         });
//     });
// }

var name = window.prompt('Enter your name')

// getting all message and listening realtime chat
db.collection("messages").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change, ind) {

        var data = change.doc.data()
        var boxContainer = document.querySelector('.box_container')

        // if new message added
        if (change.type === "added") {
            if (data.senderName == name) {       // if sender is me
                var html = `
                <div class="senderBox-right">
                    <div class="sender-name">${data.senderName}: </div>
                    <div class="sender-message">${data.message}</div>
                </div>    
                `
                boxContainer.innerHTML += html
            }
            else {
                var html = `
                <div class="senderBox-left">
                    <div class="sender-name">${data.senderName}: </div>
                    <div class="sender-message">${data.message}</div>
                </div>    
                `
                boxContainer.innerHTML += html
            }
            if (snapshot.docChanges().length - 1 == ind) { // we will scoll down on last message
                // auto scroll
                boxContainer.animate({ scrollTop: boxContainer.prop("scrollHeight") }, 1000);
            }
        }
        if (change.type === "modified") {

        }
        if (change.type === "removed") {

        }
    })
})

function sending(object) {
    db.collection("messages").add(object).then(added => {
        console.log("message sent ", added)
    }).catch(err => {
        console.err("Error occured", err)
    })
}

var sendingBtn = document.querySelector('.sending-btn')

sendingBtn.onclick = function () {
    var message = document.querySelector('.message').value
    if (message) {
        sending({
            senderName: name,
            message: message,
            data: moment().format("YYYY-MM-DD HH:mm")
        })
        message = ""
    }
    else {
        console.log("Enter your message");
    }
}

$('.message').keyup(function(event) {

    // get key code of enter
    if(event.keyCode == 13){ // enter
       var message = $('.message').val();

        if(message){
            // insert message 

            sending({
                senderName : name,
                message : message,
                date : moment().format("YYYY-MM-DD HH:mm")
            })

            $('.message').val("")
        }
    }
 
})