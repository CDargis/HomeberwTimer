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

var ingredients = ko.observableArray([]);

var ingredientSortFunc = function(a, b) {
    if(a.totalSeconds() < b.totalSeconds())
        return 1;
    if(a.totalSeconds() > b.totalSeconds())
        return -1;
    return 0;
};

var ingredientModel = function(name, amount, time) {
    obj = {
        name: ko.observable(name),
        amount: ko.observable(amount),
        dropTime: ko.observable(time),
        totalSeconds: function() {
            var tokens = time.split(":");
            var minutes = parseInt(tokens[0]);
            var seconds = parseInt(tokens[1]);
            return (minutes * 60) + seconds;
        }
    };
    obj.deleteMsg = ko.computed(function() {
        return "Delete " + obj.name() + " at " + obj.dropTime() + "?";
    });
    return obj;
};

var addIngredient = function(ing) {
    ingredients.push(ing);
    ingredients.sort(ingredientSortFunc);
};

// Add dialog
var clearAcceptDialog = function() {
    $("#ingredientName").val("");
    $("#ingredientAmount").val("");
    $("#ingredientDropTime").val("");
};

var showAddIngedientPopup = function(d, e) {
    $.mobile.changePage("#addDialog", { role: "dialog" });
};

var addDialogAccept = function() {
    var name = $("#ingredientName").val();
    var amount = $("#ingredientAmount").val();
    var time = $("#ingredientDropTime").val();
    addIngredient(ingredientModel(name, amount, time));
    $("[data-role=dialog]").dialog("close");
    clearAcceptDialog();
};

var addDialogCancel = function() {
    $("[data-role=dialog]").dialog("close");
    clearAcceptDialog();
};

// Delete dialog
var showDeleteIngredientPopup = function(d, e) {
    viewModel.modelForDeleteDialog(d);
    $.mobile.changePage("#deleteDialog", { role: "dialog" });
};

var deleteDialogAccept = function() {
    ingredients.remove(viewModel.modelForDeleteDialog());
    $("[data-role=dialog]").dialog("close");
};

var deleteDialogCancel = function() {
    $("[data-role=dialog]").dialog("close");
};

var viewModel = {
    timer: timer,
    showAddIngedientPopup: showAddIngedientPopup,
    showDeleteIngredientPopup: showDeleteIngredientPopup,
    addDialogCancel: addDialogCancel,
    deleteDialogAccept: deleteDialogAccept,
    deleteDialogCancel: deleteDialogCancel,
    modelForDeleteDialog: ko.observable(ingredientModel("", "", "")),
    ingredients: ingredients
};

ko.applyBindings(viewModel);
