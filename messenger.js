var db = firebase.firestore()

function login() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            // The signed-in user info.
            var user = result.user;
            console.log(user.uid);

            // Saving Uids
            db.collection("userUids").doc("id")
                .onSnapshot((doc) => {
                    if (doc.data() == undefined) {
                        db.collection("userUids").doc("id").set({
                            uidsArray: []
                        })
                        // if an empty array => save the first user immediately
                        db.collection("users").doc(`${user.uid}`).set({
                            name: user.displayName,
                            email: user.email,
                            imgURL: user.photoURL,
                            docUserID: user.uid
                        })
                    }
                    else {
                        db.collection('userUids').doc('id').update({
                            uidsArray: firebase.firestore.FieldValue.arrayUnion(user.uid)
                        });
                    }
                });


            // Saving USER INFOMATION after login
            db.collection("userUids").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    var uidsArray = doc.data().uidsArray
                    for (var i = 0; i < uidsArray.length; i++) {
                        if (user.uid !== uidsArray[i]) {
                            db.collection("users").doc(`${user.uid}`).set({
                                name: user.displayName,
                                email: user.email,
                                imgURL: user.photoURL,
                                docUserID: user.uid
                            })
                        }
                    }
                });
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

}

function createBoxUser(user) {
    var html = `
    <div class="boxUser">
        <div class="userAvatar">
            <img src=${user.imgURL}>
        </div>
        <h5 class="userName">${user.name}</h5>
      </div>
    `
    var boxUser_Container = document.querySelector('.boxUsers-container')
    boxUser_Container.innerHTML += html
}

// get userInfo to render
function renderUserBox(user) {
    db.collection("users").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {

            var data = change.doc.data()
            console.log(data);

            // createBoxUser(data)
            // if(change.type == "added")
            console.log(change.type);

        })
    })

}

