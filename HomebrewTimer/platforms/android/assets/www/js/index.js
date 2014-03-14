var timer = {
    targetDate: null,
    counter: null,
    timerCallBack: function() {
        var now = new Date();
        var milisecondsLeft = ((timer.targetDate - now)) % 86400000;

        var minutes = parseInt(milisecondsLeft / 60000);
        milisecondsLeft = milisecondsLeft % 60000;
        var seconds = parseInt(milisecondsLeft / 1000);
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    },
    start: function() {
        timer.counter = setInterval(timer.timerCallBack, 100);
        var date = new Date();
        date.setMinutes(date.getMinutes() + 90);
        timer.targetDate = date;
    },
    stop: function() {
        clearInterval(timer.counter);
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
