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
    if(a.time < b.time)
        return -1;
    if(a.time > b.time)
        return 1;
    return 0;
};

var ingredientModel = function(name, amount, time) {
    obj = {
        name: name,
        amount: amount,
        dropTime: time
    };
    obj.isLast = ko.computed(function() {
        console.log(ingredients().length);
        if(ingredients()[ingredients().length - 1] === obj) return true;
        else return false;
    });
    return obj;
};

var addIngredient = function(ing) {
    ingredients.push(ing);
    ingredients.sort(ingredientSortFunc);
};

var showAddIngedientPopup = function(e) {
    $("#addIngredientPopup").popup("open");
};

var addIngredientAcceptCb = function(e) {
    var name = $("#ingredientName").val();
    var amount = $("#ingredientAmount").val();
    var time = $("#ingredientDropTime").val();
    addIngredient(ingredientModel(name, amount, time));
    $("#addIngredientPopup").popup("close");
};

var showDeleteIngredientPopup = function(e) {
    var id = $(e.currentTarget).attr("id");
    $("#deleteIngredientPopup").popup("open");
};

var deleteIngredientAcceptCb = function(e) {
    $("#deleteIngredientPopup").popup("close");
};

var ViewModel = {
    timer: timer,
    showAddIngedientPopup: showAddIngedientPopup,
    addIngredientAcceptCb: addIngredientAcceptCb,
    showDeleteIngredientPopup: showDeleteIngredientPopup,
    deleteIngredientAcceptCb: deleteIngredientAcceptCb,
    ingredients: ingredients
};

ko.applyBindings(ViewModel);
