//////////////////////////////////////////
//
//
//  Namespace
//
//
//////////////////////////////////////////

var chain = {};



//////////////////////////////////////////
//
//
//  Model
//
//
//////////////////////////////////////////

chain.save = function(list) {
  localStorage["seinfeld.list"] = JSON.stringify(list);
};
chain.load = function() {
  return JSON.parse(localStorage["seinfeld.list"] || "[]")
};

// a date model API
chain.today = function() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
chain.resetDate = function() {
  return localStorage["seinfeld.start-date"] = chain.today().getTime();
}
chain.startDate = function() {
  return new Date(parseInt(localStorage["seinfeld.start-date"] || chain.resetDate()));
}
chain.dateAt = function(index) {
  var date = new Date(chain.startDate());
  date.setDate(date.getDate() + index);
  return date;
}



//////////////////////////////////////////
//
//
//  Controller
//
//
//////////////////////////////////////////

chain.controller = function() {
  var list = chain.load();

  this.isChecked = function(index) {
    return list[index];
  };
  this.check = function(index, status) {
    if (chain.dateAt(index).getTime() <= chain.today().getTime()) {
      list[index] = status;
      chain.save(list);
    }
  };
};




//////////////////////////////////////////
//
//
//  View
//
//
//////////////////////////////////////////

chain.view = function(ctrl) {
  return m("table", chain.seven(function() {
    return m("tr", chain.seven(function() {
      return m("td", [
        m("input[type=checkbox]")
      ]);
    }));
  }));
};



//////////////////////////////////////////
//
//
//  Utility Helpers
//
//
//////////////////////////////////////////

chain.seven = function(subject) {
  var output = [];
  for (var i = 0; i < 7; i++) output.push(subject(i));
  return output;
};



//////////////////////////////////////////
//
//
//  Execution
//
//
//////////////////////////////////////////

m.module(document.body, chain);                              // Render the DOM



//////////////////////////////////////////
//
//
//  Seinfeld API
//
//
//////////////////////////////////////////

// var list = chain.load();                                  // Basic usage
// list[42] = true;
// chain.save(list);
//
// chain.save([]);                                           // Reset the list
//
//
//
//                                                           // Date Model API:
// var today = chain.today()                                 // today at midnight
//
// var startDate = chain.startDate();                        // start date is today
//
// var isToday = chain.dateAt(3).getTime() == chain.today()  // is three days from now the same as today? Should be false
//
// var newStartDate = chain.resetDate();                     // new start date is today
//
//
//
//                                                           // Controller API:
// var ctrl = new chain.controller();
//
// var isFirstDayChecked = ctrl.isChecked(0);                // is first day checked?
//
// ctrl.check(0, true);
