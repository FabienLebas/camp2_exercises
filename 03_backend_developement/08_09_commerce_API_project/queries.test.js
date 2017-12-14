const queries = require("./queries");

test("Try to get data from table brands", done => {
  expect.assertions(1);

  const result = {
    rows: [],
    send: function (data){
      this.rows = data;
    }
  };

  queries.getAllDataFromTable("brands", result);
  done();

  // réponse d'Arnaud : pas possible de tester les queries.

});
