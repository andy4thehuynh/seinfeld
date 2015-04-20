//////////////////////////////////////////
//
//
//  Namespace
//
//
//////////////////////////////////////////

var seinfeld = {};



//////////////////////////////////////////
//
//
//  Model
//
//
//////////////////////////////////////////

seinfeld.save = function(list) {
  localStorage["seinfeld-app.list"] = JSON.stringify(list);
};
seinfeld.load = function() {
  return JSON.parse(localStorage["seinfeld-app.list"] || "[]")
};

// a date model API
seinfeld.today = function() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
seinfeld.resetDate = function() {
  return localStorage["seinfeld-app.start-date"] = seinfeld.today().getTime();
}
seinfeld.startDate = function() {
  return new Date(parseInt(localStorage["seinfeld-app.start-date"] || seinfeld.resetDate()));
}
seinfeld.dateAt = function(index) {
  var date = new Date(seinfeld.startDate());
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

seinfeld.controller = function() {
  var list = seinfeld.load();

  this.isChecked = function(index) {
    return list[index];
  };
  this.check = function(index, status) {
    if (seinfeld.dateAt(index).getTime() <= seinfeld.today().getTime()) {
      list[index] = status;
      seinfeld.save(list);
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

seinfeld.view = function(ctrl) {
  return m("table", seinfeld.seven(function(y) {
    return m("tr", seinfeld.seven(function(x) {
      var index = seinfeld.indexAt(x, y)
      return m("td", seinfeld.highlights(index), [
        m("input[type=checkbox]", seinfeld.checks(ctrl, index))
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

seinfeld.seven = function(subject) {
  var output = [];
  for (var i = 0; i < 7; i++) output.push(subject(i));
  return output;
};

seinfeld.checks = function(ctrl, index) {
  return {
    onclick: function() {
      ctrl.check(index, this.checked);
    },
    checked: ctrl.isChecked(index)
  }
}

seinfeld.indexAt = function(x, y) {
  return y * 7 + x;
}

seinfeld.highlights = function(index) {
  return {
    style: {
      background: seinfeld.dateAt(index).getTime() == seinfeld.today().getTime() ? "red" : ""
    }
  }
}


//////////////////////////////////////////
//
//
//  Execution
//
//
//////////////////////////////////////////

m.module(document.body, seinfeld);                                 // Render the DOM



//////////////////////////////////////////
//
//
//  Seinfeld API
//
//
//////////////////////////////////////////

// var list = seinfeld.load();                                     // Basic usage
// list[42] = true;
// seinfeld.save(list);
//
// seinfeld.save([]);                                              // Reset the list
//
//
//
//                                                                 // Date Model API:
// var today = seinfeld.today()                                    // today at midnight
//
// var startDate = seinfeld.startDate();                           // start date is today
//
// var isToday = seinfeld.dateAt(3).getTime() == seinfeld.today()  // is three days from now the same as today? Should be false
//
// var newStartDate = seinfeld.resetDate();                        // new start date is today
//
//
//
//                                                                 // Controller API:
// var ctrl = new seinfeld.controller();
//
// var isFirstDayChecked = ctrl.isChecked(0);                      // is first day checked?
//
// ctrl.check(0, true);
