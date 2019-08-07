DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  qty INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (item_name, price, qty)
VALUES ("happiness", 100.15, 1000), ("love", 550.27, 300), ("security", 700.04, 400);
