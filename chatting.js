var db = firebase.firestore()

var name = window.prompt('Enter your name')
var messageBox = document.querySelector('.messageBox')

// getting all message and listening realtime chat
function render() {
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

                // Scrolling after adding new message
                shouldScroll = messageBox.scrollTop + messageBox.clientHeight === messageBox.scrollHeight;
                if (!shouldScroll) {
                    scrollToBottom();
                }
            }
            if (change.type === "modified") {

            }
            if (change.type === "removed") {

            }
        })
    })
}
render()


function scrollToBottom() {
    messageBox.scrollTop = messageBox.scrollHeight;
}

scrollToBottom();


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
            date: moment().format("YYYY-MM-DD HH:mm")
        })
    }
    else {
        console.log("Enter your message");
    }
}

$('.message').keyup(function (event) {

    // get key code of enter
    if (event.keyCode == 13) { // enter
        var message = $('.message').val();

        if (message) {
            // insert message 

            sending({
                senderName: name,
                message: message,
                date: moment().format("YYYY-MM-DD HH:mm")
            })

        }
    }

})