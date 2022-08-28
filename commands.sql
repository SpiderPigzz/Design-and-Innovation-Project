BEGIN TRANSACTION;
DROP TABLE IF EXISTS "customer";
CREATE TABLE IF NOT EXISTS "customer" (
	"email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"name"	TEXT NOT NULL,
	"address"	TEXT,
	"picture"	BLOB,
	"coins"	INTEGER,
	PRIMARY KEY("email")
);
DROP TABLE IF EXISTS "tag";
CREATE TABLE IF NOT EXISTS "tag" (
	"name"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"description"	TEXT,
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "shop_tags";
CREATE TABLE IF NOT EXISTS "shop_tags" (
	"shop.ID"	INTEGER NOT NULL UNIQUE,
	"tag.name"	TEXT NOT NULL UNIQUE,
	FOREIGN KEY("shop.ID") REFERENCES "shop "("ID"),
	FOREIGN KEY("tag.name") REFERENCES "tag"("name")
);

CREATE TABLE "dish" (
	"shop.ID"	INTEGER NOT NULL ,
	"name"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"description"	TEXT,
	"price"	INTEGER NOT NULL,
	"picture"	BLOB,
	"Is available"	INTEGER NOT NULL,
	FOREIGN KEY("shop.ID") REFERENCES "shop"("ID"),
	PRIMARY KEY("name")
);

CREATE TABLE "order" (
	"ID"	INTEGER NOT NULL UNIQUE ,
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"address"	TEXT NOT NULL,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	PRIMARY KEY("ID")
);

CREATE TABLE "order_items" (
	"shop.ID"	INTEGER NOT NULL UNIQUE ,
	"dish.name"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"order.ID"	INTEGER NOT NULL UNIQUE ,
	"quantity"	INTEGER NOT NULL,
	FOREIGN KEY("shop.ID") REFERENCES "dish"("shop.ID"),
	FOREIGN KEY("order.ID") REFERENCES "order"("ID"),
	FOREIGN KEY("dish.name") REFERENCES "dish"("name")
);

CREATE TABLE "cart_items" (
	"shop.ID"	INTEGER NOT NULL UNIQUE ,
	"dish.name"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"quantity"	INTEGER NOT NULL,
	FOREIGN KEY("dish.name") REFERENCES "dish"("name"),
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	FOREIGN KEY("shop.ID") REFERENCES "dish"("shop.ID")
);

CREATE TABLE "reward" (
	"date"	INTEGER NOT NULL UNIQUE,
	"amount"	INTEGER NOT NULL,
	PRIMARY KEY("date")
);
DROP TABLE IF EXISTS "order";
CREATE TABLE IF NOT EXISTS "order" (
	"ID"	TEXT NOT NULL UNIQUE,
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"address"	TEXT NOT NULL,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	PRIMARY KEY("ID")
);
DROP TABLE IF EXISTS "post";
CREATE TABLE IF NOT EXISTS "post" (
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"ID"	TEXT NOT NULL UNIQUE,
	"picture"	BLOB,
	"text"	TEXT,
	"date"	INTEGER DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	PRIMARY KEY("ID")
);
DROP TABLE IF EXISTS "shop ";
CREATE TABLE IF NOT EXISTS "shop " (
	"ID"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"picture"	BLOB,
	"description"	TEXT,
	"address"	TEXT NOT NULL,
	"opening time"	INTEGER NOT NULL,
	"closing time"	INTEGER NOT NULL,
	PRIMARY KEY("ID")
);

CREATE TABLE "customer_ratings" (
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"shop.ID"	INTEGER NOT NULL UNIQUE ,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"rating" INTEGER NOT NULL,
	"comments" TEXT,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	FOREIGN KEY("shop.ID") REFERENCES "shop"("ID")
);