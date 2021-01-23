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
                toggleErrorLabel();
            } else {
                clearFormState();
                toggleSuccessLabel();

                setTimeout(() => {
                    toggleSuccessLabel();
                }, 2000);
            }
            
            player.stop();
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
}

function startPlayer() {
    player.play();
}

function stopPlayer() {
    player.stop();
}

function toggleErrorLabel() {
    document.getElementById('errorLabel').classList.toggle('message-error--visible');
}

function toggleSuccessLabel() {
    document.getElementById('successLabel').classList.toggle('message-success--visible');
}