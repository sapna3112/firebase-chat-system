const firebaseConfig = {
    apiKey: "AIzaSyBlwJipp3du5VGkEqTEHWYXaUJzckxhGYc",
    authDomain: "fir-chat-system-878db.firebaseapp.com",
    projectId: "fir-chat-system-878db",
    storageBucket: "fir-chat-system-878db.appspot.com",
    messagingSenderId: "932592777330",
    appId: "1:932592777330:web:a2607b2a1bbd859dee6aeb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

function typeMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
    const message_btn = document.getElementById("message-btn");
    if (message.length > 0) {
        message_btn.removeAttribute('disabled', true)
    } else {
        message_btn.setAttribute('disabled', true)
    }
}

function scrollToBottom() {
    var objDiv = document.getElementById("bodyContent");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function sendMessage() {
    // e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";
    typeMessage();

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("bodyContent").innerHTML += message;
    scrollToBottom();
});