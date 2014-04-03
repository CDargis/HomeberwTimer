var timer = {
    targetDate: null,
    counter: null,
    timerCallBack: function() {
        var now = new Date();
        var milisecondsLeft = ((timer.targetDate - now)) % 86400000;

        // Calculations
        var minutes = parseInt(milisecondsLeft / 60000);
        milisecondsLeft = milisecondsLeft % 60000;
        var seconds = parseInt(milisecondsLeft / 1000);

        // Set the UI
        $(".minutes").text(minutes);
        $(".seconds").text(seconds);
    },
    start: function() {
        timer.stop();
        timer.counter = setInterval(timer.timerCallBack, 500);
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
        console.log(id);
    }
};

var ingredients = {};

var generateID = function(name, amount, time) {
    var i = 0;
    while(true) {
        var proposed = name + "_" + amount + "_" + time + "_" + i;
        if(ingredients[proposed] == undefined) {
            ingredients[proposed] = true;
            return proposed;
        }
        i++;
    }
};

var fixName = function(name) {
    return name;
}

var fixAmount = function(amount) {
    return amount;
}

var fixTime = function(time) {
    return time;
}

var showAddIngedientPopup = function(e) {
    $("#addIngredientPopup").popup("open");
};

var addIngredientAcceptCb = function(e) {
    var name = $("#ingredientName").val();
    var amount = $("#ingredientAmount").val();
    var time = $("#ingredientDropTime").val();
    var id = generateID(name, amount, time);
    console.log(id);
    $("#addIngredientPopup").popup("close");
};

var showDeleteIngredientPopup = function(e) {
    var id = $(e.currentTarget).attr("id");
    $("#deleteIngredientPopup").popup("open");
};

var deleteIngredientAcceptCb = function(e) {
    $("#deleteIngredientPopup").popup("close");
};

$(document).ready(function() {
    $("#startButton").click(timer.start);
    $("#stopButton").click(timer.stop);
    $(".ingredients .addButton").click(showAddIngedientPopup);
    $("#addPopupAccept").click(addIngredientAcceptCb);
    $(".ingredients .ingredient").click(showDeleteIngredientPopup);
    $("#deletePopupAccept").click(deleteIngredientAcceptCb);
});
