// Running this application will first display all of the items available for sale. Include the ids, names, 
// and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of 
// the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

//need to connect to a mysql database that has items for sale stored they need ids, names, prices, qty
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

//display items
connection.query("SELECT * FROM products;", function (err, res) {
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
    console.log("Item ID: " + res[i].id + " || Item Name: " + res[i].item_name + " || Price: " + res[i].price)
  } inquirer
    .prompt({
      name: "interestedIn",
      type: "input",
      message: "What is the id of the item you are interested in?",
    }).then(function (answer) {
      console.log(answer)
    })
})

//search inquiry will search based on two inputs item id and qty
// function start() {
//   console.log(products);

// }




//we will then need to confirm that the qty is sufficient to fill the order


//if no return a message about insufficient qty


//to fufil the customer's order if there is enough qty we will need to do the following

//update sql db to reflect remaining qty

//show customer total cost of their purchase