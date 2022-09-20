import sqlite3

from flask import Flask
app = Flask(__name__)




@app.route('/listShop')
def hello_world():
    con = sqlite3.connect("kungfoodhippo.db")
    cur = con.cursor()
    res = cur.execute("SELECT name,address FROM shop")
    rows = res.fetchall()
    return rows

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)