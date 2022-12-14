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
DROP TABLE IF EXISTS "reward";
CREATE TABLE IF NOT EXISTS "reward" (
	"date"	INTEGER NOT NULL UNIQUE,
	"amount"	INTEGER NOT NULL,
	PRIMARY KEY("date")
);
DROP TABLE IF EXISTS "customer_logins";
CREATE TABLE IF NOT EXISTS "customer_logins" (
	"reward.date"	INTEGER NOT NULL UNIQUE,
	"customer.email"	INTEGER NOT NULL UNIQUE COLLATE NOCASE,
	"chain"	INTEGER,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	FOREIGN KEY("reward.date") REFERENCES "reward"("date")
);
DROP TABLE IF EXISTS "comment";
CREATE TABLE IF NOT EXISTS "comment" (
	"customer.email"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"ID"	TEXT NOT NULL UNIQUE,
	"post.ID"	INTEGER NOT NULL UNIQUE,
	"picture"	BLOB,
	"text"	TEXT,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
DROP TABLE IF EXISTS "shop";
CREATE TABLE IF NOT EXISTS "shop" (
	"ID"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"picture"	BLOB,
	"description"	TEXT,
	"address"	TEXT NOT NULL,
	"opening time"	INTEGER NOT NULL,
	"closing time"	INTEGER NOT NULL,
	PRIMARY KEY("ID")
);
DROP TABLE IF EXISTS "order_items";
CREATE TABLE IF NOT EXISTS "order_items" (
	"shop.ID"	TEXT NOT NULL,
	"dish.name"	TEXT NOT NULL COLLATE NOCASE,
	"order.ID"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	FOREIGN KEY("order.ID") REFERENCES "order"("ID"),
	FOREIGN KEY("shop.ID","dish.name") REFERENCES "dish"("shop.ID","name"),
	PRIMARY KEY("order.ID","dish.name","shop.ID")
);
DROP TABLE IF EXISTS "cart_items";
CREATE TABLE IF NOT EXISTS "cart_items" (
	"shop.ID"	TEXT NOT NULL,
	"dish.name"	TEXT NOT NULL COLLATE NOCASE,
	"customer.email"	TEXT NOT NULL COLLATE NOCASE,
	"quantity"	INTEGER NOT NULL,
	FOREIGN KEY("shop.ID","dish.name") REFERENCES "dish"("shop.ID","name"),
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	PRIMARY KEY("shop.ID","dish.name","customer.email")
);
DROP TABLE IF EXISTS "review";
CREATE TABLE IF NOT EXISTS "review" (
	"food"	INTEGER,
	"packaging"	INTEGER,
	"value"	INTEGER,
	"id"	TEXT NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "tag";
CREATE TABLE IF NOT EXISTS "tag" (
	"name"	TEXT NOT NULL UNIQUE COLLATE NOCASE,
	"description"	TEXT,
	"category"	TEXT,
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "shop_tags";
CREATE TABLE IF NOT EXISTS "shop_tags" (
	"shop.ID"	TEXT NOT NULL,
	"tag.name"	TEXT NOT NULL,
	FOREIGN KEY("shop.ID") REFERENCES "shop"("ID"),
	FOREIGN KEY("tag.name") REFERENCES "tag"("name")
);
DROP TABLE IF EXISTS "customer_review";
CREATE TABLE IF NOT EXISTS "customer_review" (
	"customer.email"	REAL NOT NULL COLLATE NOCASE,
	"shop.ID"	INTEGER NOT NULL,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"review.id"	TEXT NOT NULL,
	"comments"	TEXT,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	FOREIGN KEY("shop.ID") REFERENCES "shop"("ID")
);
DROP TABLE IF EXISTS "dish";
CREATE TABLE IF NOT EXISTS "dish" (
	"shop.ID"	TEXT NOT NULL,
	"name"	TEXT NOT NULL COLLATE NOCASE,
	"category"	TEXT,
	"description"	TEXT,
	"price"	INTEGER NOT NULL,
	"picture"	BLOB,
	"Is available"	INTEGER NOT NULL,
	FOREIGN KEY("shop.ID") REFERENCES "shop"("ID"),
	PRIMARY KEY("name","shop.ID")
);
DROP TABLE IF EXISTS "address_location";
CREATE TABLE IF NOT EXISTS "address_location" (
	"address"	TEXT UNIQUE,
	"long"	REAL,
	"lat"	REAL
);
DROP TABLE IF EXISTS "order";
CREATE TABLE IF NOT EXISTS "order" (
	"ID"	TEXT NOT NULL UNIQUE,
	"customer.email"	TEXT NOT NULL COLLATE NOCASE,
	"address"	TEXT NOT NULL,
	"date"	INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("customer.email") REFERENCES "customer"("email"),
	PRIMARY KEY("ID")
);
COMMIT;
