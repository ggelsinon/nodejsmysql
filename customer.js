// Instructions:
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
require("console.table");

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

  //display items
  displayitems();
});

function displayitems() {
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].id + " || Item Name: " + res[i].item_name + " || Price: " + res[i].price);
    }
    customerPromptA(res);
  });
}


function customerPromptA(item) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What item are you interested in?",
      }
    ])
    .then(function(res) {

      var choiceId = parseInt(res.choice);
      var product = checkitem(choiceId, item);

      if (product) {
        qtyPrompt(product);
      }
      else {
        console.log("There was an issue with the item you selected");
        displayitems();
      }
    });
}

function qtyPrompt(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "What quantity would you like to order?",
      }
    ])
    .then(function(res) {

      var quantity = parseInt(res.quantity);

       if (quantity > product.stock_quantity) {
        console.log("Insufficient quantity!");
        displayitems();
      }
      else {
        fulfill(product, quantity);
      }
    });
}

function fulfill(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
    [quantity, product.id],
    function(err, res) {
      console.log("Please enjoy the " + quantity + " count of " + product.item_name + " you have purchased!" + " Your order cost is $"+product.price*quantity);
      displayitems();
    }
  );
}

function checkitem(choiceId, item) {
  for (var i = 0; i < item.length; i++) {
    if (item[i].id === choiceId) {
      return item[i];
    }
  }

  return null;
}