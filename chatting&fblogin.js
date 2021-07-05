let login = document.getElementById("send")
let container = document.getElementById("container")
var db = firebase.firestore()



login.addEventListener("click", () => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {

            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            let html = `
                <h1>${user.uid}</h1>
                <img src=${user.photoURL}>
                `
            container.innerHTML += html

            console.log(user)
            render(user.uid)


            // get user info for sending message
            var sendingBtn = document.querySelector('.sending-btn')

            sendingBtn.onclick = function () {
                var message = document.querySelector('.message').value
                if (message) {
                    sending({
                        name: user.displayName,
                        message: message,
                        date: moment().format("YYYY-MM-DD HH:mm"),
                        docMessID: user.uid

                    })
                }
                else {
                    console.log("Enter your message");
                }
            }
            // Saving USER INFOMATION after sending

            db.collection("users").add({
                name: user.displayName,
                email: user.email,
                imgURL: user.photoURL,
                docUserID: user.uid
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });



            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
})



function sending(object) {
    db.collection("messages").add(object).then(added => {
        console.log("message sent ", added)
    }).catch(err => {
        console.err("Error occured", err)
    })
}

// function getUserUids() {
//     db.collection("users").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             var userUid = doc.data().docUserID
//             var myArray = []
//         });
//     });
// }

// getUserUids()

function render(userUid) {
    db.collection("messages").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change, ind) {

            var data = change.doc.data()
            var boxContainer = document.querySelector('.box_container')

            // if new message added
            if (change.type === "added") {
                if (data.docMessID == userUid) {       // if sender is me
                    var html = `
                <div class="senderBox-right">
                    <div class="sender-name">${data.name}: </div>
                    <div class="sender-message">${data.message}</div>
                </div>    
                `
                    boxContainer.innerHTML += html
                }
                else {
                    var html = `
                <div class="senderBox-left">
                    <div class="sender-name">${data.name}: </div>
                    <div class="sender-message">${data.message}</div>
                </div>    
                `
                    boxContainer.innerHTML += html
                }


                // Scrolling after adding new message
                shouldScroll = boxContainer.scrollTop + boxContainer.clientHeight === boxContainer.scrollHeight;
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

