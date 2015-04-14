// our app's namespace
var chain = {};

// model goes here

// controller goes here

// view
chain.view = function(ctrl) {
  return m("table", chain.seven(function() {
    return m("tr", chain.seven(function() {
      return m("td", [
        m("input[type=checkbox]")
      ]);
    }));
  }));
};
