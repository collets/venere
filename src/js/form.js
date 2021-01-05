var firebaseConfig = {
    apiKey: "AIzaSyBZWhk7GHZYHGerFcuXiyxjkCxCeTRRq-0",
    authDomain: "venere-colenzato.firebaseapp.com",
    databaseURL: "https://venere-colenzato-default-rtdb.firebaseio.com",
    projectId: "venere-colenzato",
    storageBucket: "venere-colenzato.appspot.com",
    messagingSenderId: "307681475047",
    appId: "1:307681475047:web:7204a80db940ed658aa542",
    measurementId: "G-6WV19YEP0W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const player = document.querySelector("lottie-player");
let success = false;
let error = false;

document.getElementById('messageForm').addEventListener('submit', (evt) => {
    evt.preventDefault();
    onSubmit();
});

function sendMessage(name, message) {
    const record = {
        name,
        message,
    }

    firebase.database().ref('messages').push().set(
        record, 
        (error) => {
            if (error) {
              setErrror();
            } else {
              setSuccess();
            }
          }
        );
}

function onSubmit() {
    startPlayer();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    sendMessage(name, message);
}

function clearFormState() {
    document.getElementById('name').value = '';    
    document.getElementById('message').value = '';

    if (error)
        toggleErrorLabel();

    success = false;
    error = false;
}

function startPlayer() {
    attachLoopListener();

    player.play();
}

function stopPlayer() {
    player.stop();
}

function attachLoopListener() {
    player.addEventListener('frame', (event) => {
        if(Math.trunc(event.detail.frame) >= 118 && Math.trunc(event.detail.frame) < 239) {
            if (success) {
                player.seek(239);
            } else if (error) {
                player.seek(706);
                toggleErrorLabel();
            } else {
                player.seek(0);
            }
        }
        
        if (Math.trunc(event.detail.frame) === 418 || Math.trunc(event.detail.frame) === 839) {
            stopPlayer();

            if (success)                
              clearFormState();
        }
    })
}

function setSuccess() {
    success = true;
}

function setErrror() {
    error = true;
}

function toggleErrorLabel() {
    document.getElementById('errorLabel').classList.toggle('message-error--visible');
}