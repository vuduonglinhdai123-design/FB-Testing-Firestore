let send = document.getElementById("send")
let container  = document.getElementById("container")
send.addEventListener("click",()=> {
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


