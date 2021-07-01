var db = firebase.firestore()

// ADDING
function getInputValues() {
    var userName = document.querySelector('.name').value
    var userEmail = document.querySelector('.email').value
    var userPassword = document.querySelector('.password').value
    if (userName && userEmail && userPassword !== "") {
        adding(userName, userEmail, userPassword)
    }
    else {
        console.log('Enter all the fields');
    }
}

function adding(name, email, password) {
    db.collection('users').add({
        name: name,
        email: email,
        password: password,
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// CHECKING SIGN IN INFO (Test comparing sign in and sign up account infomation)

// function signIn() {
//     var signIn_Email = document.querySelector('.signIn_Email').value
//     var signIn_Password = document.querySelector('.signIn_Password').value
//     getUser(signIn_Email, signIn_Password)

// }

// function getUser(signIn_Email, signIn_Password) {
//     var usersInfoArray = []
//     db.collection("users").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             var data = doc.data()
//             usersInfoArray.push(data)
//         });
//         usersInfoArray.filter((user) => {
//             if (user.email === signIn_Email && user.password === signIn_Password) {
//                 console.log('Sign in successfully !');
//                 console.log(user);
//             }
//         })

//     });


// }






// // DELETING
// function deleting() {
//     var docIdsArray = []

//     // Get all userIds to compare
//     db.collection("users").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             docIdsArray.push(doc.id)
//         });
//         getdocIds(docIdsArray)
//     });

//     // comparing
//     function getdocIds(ids) {
//         var deletingId = document.querySelector('.id')
//         var deletingForm = document.querySelector('.deleting')
//         for (let i = 0; i < ids.length; i++) {
//             if (deletingId.value !== "" && deletingId.value === ids[i]) {
//                 db.collection("users").doc(`${deletingId.value}`).delete().then(() => {
//                     console.log("Document successfully deleted!");
//                 }).catch((error) => {
//                     console.error("Error removing document: ", error);
//                 });
//             }
//             else {
//                 console.log('Enter deleting id');
//             }
//         }
//         deletingForm.classList.toggle('hide')
//     }
// }

// 


