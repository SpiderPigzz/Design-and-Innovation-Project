import sqlite3
import json
from collections import UserList


dbfile = "kungfoodhippo.db"

class Columns(UserList):
    def __init__(self, *args):
        self.data = args
        self.names = list(self.backticked())
        self.binds = ", ".join(self.backticked())
        self.nulls = "NULL, "*len(self)

    def backticked(self):
        return (f"`{e}`" for e in self)
    def prepended(self, prefix):
        prependedCols = Columns(*self)
        dottedNames = (f"{prefix}.{e}" for e in self.backticked())
        self.names = list(dottedNames)
        prependedCols.binds = ", ".join(self.names)
        return prependedCols
    def isIn(self, iter):
        return (e in iter for e in self)
    def __add__(self, other):
        added = Columns(*self, *other)
        if hasattr(other, 'binds'):
            added.binds = f"{self.binds}, {other.binds}"
        if hasattr(other, 'names'):
            added.names = self.names + other.names
        return added
    def __sub__(self, other):
        args = []
        for e in self:
            if e not in other:
                args.append(e)
        subbed = Columns(*args)
        return subbed

def dumpRows(results, columns):
    rows = []
    for row in results:
        r = {}
        for column,value in zip(columns, row):
            r[column] = value
        rows.append(r)
    return json.dumps(rows) 

class SQLite(object):
    def __init__(self):
        self.con = sqlite3.connect(dbfile)
        self.cur =  self.con.cursor()
        #self.con.execute("PRAGMA foreign_keys = on")
    def __enter__(self):
        return self.cur
    def __exit__(self, type, value, traceback):
        self.con.commit()
        self.cur.close()
        self.con.close()

shopCols = Columns('ID', 'name', 'description', 'address')
customerCols = Columns('email', 'name', 'address')
dishCols = Columns('name', 'description','category', 'price', 'Is available')
cartCols = Columns('customer.email', 'shop.ID', 'dish.name', 'quantity')
reviewCols = Columns('shop.ID','customer.email', 'date', 'comments', 'review.id')
ratingCols = Columns('food', 'packaging', 'value')
summarizeRating = "AVG(r.`food`+r.`packaging`+r.`value`)/3 as overall"
countRowColumn =" count() as count"
ratingOperators = {
    "gt":">",
    "gte":">=",
    "lt":"<",
    "lte":"<=",
    "eq":"="
}
