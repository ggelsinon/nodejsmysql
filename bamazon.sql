SELECT * FROM bamazon.products;
DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
USE bamazon;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  qty INT NULL,
  PRIMARY KEY (id)
);
INSERT INTO products (item_name, price, qty)
VALUES ("happiness", 100.15, 1000), ("love", 550.27, 300), ("security", 700.04, 400);
