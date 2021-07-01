let send = document.getElementById("send")
let container = document.getElementById("container")

// this one
var db = firebase.firestore()

send.addEventListener("click", () => {
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

      // Saving USER INFOMATION after sending

      db.collection("users").add({
        name: user.displayName,
        email: user.email,
        imgURL: user.photoURL
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


// (1)
// SETTING(doc)
// If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document

// db.collection("cities").doc("LA").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// })

// db.collection("cities").doc("VN").set({
//   name: "VN",
//   state: "HaNoi",
//   country: "VietNam"
// })
// .then(() => {
//   console.log("Document successfully written!");
// })
// .catch((error) => {
//   console.error("Error writing document: ", error);
// });

// (2)
// UPDATING(fields)
// To update some fields of a document without overwriting the entire document, use the update() method:

// var UserUpdating = db.collection('users').doc('VGoHZqmAY1UjDFMZC91u');
// UserUpdating.update({
//   Dream: "Investor"
// })
//   .then(() => {
//     console.log("Document successfully updated!");
//   })
//   .catch((error) => {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
//   });


// (3)
// GETTING 
// Get all documents in a collection
// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });

// Get data of 1 doc
// db.collection("users").doc("TTLcWdFvbhNQIxieoXoK")
//     .onSnapshot((doc) => {
//         console.log("Current data: ", doc.data());
//     });


// (4)
// DELETING
// Delete documents
// db.collection("cities").doc("DC").delete().then(() => {
//   console.log("Document successfully deleted!");
// }).catch((error) => {
//   console.error("Error removing document: ", error);
// });


// Delete fields
// var cityRef = db.collection('cities').doc('BJ');

// // Remove the 'capital' field from the document
// var removeCapital = cityRef.update({
//     capital: firebase.firestore.FieldValue.delete()
// });