from dbconn import *
from geo import *
from flask import Flask, Response, request
import time,datetime

app = Flask(__name__)




@app.route('/listShop')
def listShop():
    with SQLite() as cur:
        columns = shopCols

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "ID",
            sortOrderDefault = "ASC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM shop
                ORDER BY {sortBy} {sortOrder}
            """
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/searchShopByName/<string:name>')
def searchShopByName(name):
    with SQLite() as cur:
        columns = shopCols

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "name",
            sortOrderDefault = "ASC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM shop
                WHERE `name` like "%"||?||"%"
                ORDER BY {sortBy} {sortOrder}
            """,
            (name,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/listCustomer')
def listCustomer():
    with SQLite() as cur:
        columns = customerCols

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "email",
            sortOrderDefault = "ASC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        sortByReq = request.args.get('sortBy')
        sortOrderReq = request.args.get('sortOrder')

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM customer
                ORDER BY {sortBy} {sortOrder}
            """
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')




@app.route('/listCuisine')
def listCuisine():
    with SQLite() as cur:
        columns = Columns('name', 'description')

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "name",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM tag WHERE category='cuisine'
                ORDER BY {sortBy} {sortOrder}
            """
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/listTag')
def listTag():
    with SQLite() as cur:
        columns = Columns('name', 'description', 'category')

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "name",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM tag
                ORDER BY {sortBy} {sortOrder}
            """
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')
        

@app.route('/listCategory')
def listCategory():
    with SQLite() as cur:
        columns = Columns('category')

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "category",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT distinct {columns.binds} FROM tag
                ORDER BY {sortBy} {sortOrder}
            """
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/listTagByCategory/<string:category>')
def listTagByCategory(category):
    with SQLite() as cur:
        columns = Columns('name', 'description', 'category')

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "name",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM tag WHERE `category`=?
                ORDER BY {sortBy} {sortOrder}
            """,
            (category,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getShop/<string:id>/')
def getShop(id):
    with SQLite() as cur:
        columns = shopCols
        res = cur.execute(
            f"SELECT {columns.binds} FROM shop WHERE ID=?", 
            (id,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getShopMenu/<string:id>')
def getShopMenu(id):
    with SQLite() as cur:
        columns = dishCols

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "name",
            sortOrderDefault = "ASC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM dish where `shop.id`=?
                ORDER BY {sortBy} {sortOrder}
            """,
            (id,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getShopReview/<string:id>')
def getShopReview(id):
    with SQLite() as cur:
        columns = Columns("name").prepended('c')+ reviewCols + ratingCols.prepended('r')
        bind = columns.binds
        columns = columns + Columns("overall")
        columns.binds =  f"{bind}, {summarizeRating}"
        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "date",
            sortOrderDefault = "DESC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )
        filters = request.args.getlist("filters")
        filterBinds = ""
        filterValues = []
        for fil in filters:
            filterColumn, filterOperator, filterValue = sanitizeFilterArgs(
                Columns("date") + ratingCols.prepended('r') + Columns("overall")
                ,fil
            )
            if all((filterColumn, filterOperator, filterValue)):
                try:
                    filterBinds = f"{filterBinds} AND {filterColumn} {filterOperator} ?"
                    filterValue =float(filterValue)
                    filterValues.append(filterValue)
                except ValueError as e:
                    filterBinds = ""
                    filterValues = []
                    


        res = cur.execute(
            f"""
                SELECT
                    {columns.binds}
                FROM customer_review
		        JOIN review AS r 
		        ON `review.id` = `id`
                JOIN `customer` as c
                ON `email`=`customer.email`
                WHERE `shop.ID` = ?
                GROUP BY `customer.email`
                HAVING true {filterBinds}   
                ORDER BY {sortBy} {sortOrder}

           """,
            (id,*filterValues)
        )
        res = res.fetchall()
        out = []
        for d in res:
            l = list(d)
            l[3] = datetime.date.fromtimestamp(d[3]).strftime('%m/%d/%Y')
            out.append(l)
        out = dumpRows(out, columns)
        return Response(out, mimetype='application/json')

@app.route('/getCustomerReview/<string:email>')
def getCustomerReview(email):
    with SQLite() as cur:
        columns = Columns("name").prepended('c')+ reviewCols + ratingCols.prepended('r')
        bind = columns.binds
        columns = columns + Columns("overall")
        columns.binds =  f"{bind}, {summarizeRating}"
        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "date",
            sortOrderDefault = "DESC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        filters = request.args.getlist("filters")
        filterBinds = ""
        filterValues = []
        for fil in filters:
            filterColumn, filterOperator, filterValue = sanitizeFilterArgs(
                Columns("date") + ratingCols.prepended('r') + Columns("overall")
                ,fil
            )
            if all((filterColumn, filterOperator, filterValue)):
                try:
                    filterBinds = f"{filterBinds} AND {filterColumn} {filterOperator} ?"
                    filterValue =float(filterValue)
                    filterValues.append(filterValue)
                except ValueError as e:
                    filterBinds = ""
                    filterValues = []


        res = cur.execute(
            f"""
                SELECT
                    {columns.binds}
                FROM customer_review
		        JOIN review as r
		        ON `review.id` = r.`id`
                JOIN `customer` as c
                ON `email`=`customer.email`
                WHERE `customer.email` = ?
                GROUP BY `shop.ID`
                HAVING true {filterBinds}   
                ORDER BY {sortBy} {sortOrder}
           """,
            (email,*filterValues)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')

import numpy 
@app.route('/getShopRating/<string:id>')
def getShopRating(id):
    timeWindow = 30#30 days
    timeWindow = datetime.timedelta(days=timeWindow)
    with SQLite() as cur:
        columns = Columns('shop.ID', 'food', 'packaging', 'value')
        res = cur.execute(
            f"""
                SELECT
					{columns.binds},date
                FROM customer_review
                JOIN review as r
                ON `review.id` = r.`id`
                WHERE `shop.ID` = ?
           """,
           (id, )
        )
        out = res.fetchall()
        print(out)
        food = sorted(d[1] for d in out)
        packaging = sorted(d[2] for d in out)
        value = sorted(d[3] for d in out)
        
        columns = Columns(
            "shop.ID",
            "food",
            "food delta",
            "packaging",
            "packaging delta",
            "value",
            "value delta",
            "overall",
            "overall delta",
            "cutoff date",
            "count")
        values= [id]

        epoch = (datetime.date.today()-timeWindow)
        epoch = time.mktime(epoch.timetuple()) 
        print(epoch)
        for i,l in enumerate((food, packaging, value)):
            q10 = numpy.percentile(l, 10)
            q90 = numpy.percentile(l, 90)
            d = l
            d = numpy.where(l<q10, q10, d)
            d = numpy.where(l>q90, q90, d)
            mean =numpy.mean(d)
            values.append(mean)
            d = [d[i+1] for d in out if d[4]>epoch]
            values.append(numpy.mean(d)-mean)


        values.append(numpy.mean(values[1:6:2]))
        values.append(numpy.mean(values[2:7:2]))
        values.append(datetime.date.fromtimestamp(epoch).strftime('%m/%d/%Y'))
        values.append(len(out))
        out = dumpRows([values], columns)
        return Response(out, mimetype='application/json')


@app.route('/getShopRatingx/<string:id>')
def getShopRatingx(id):
    with SQLite() as cur:
        columns = Columns('shop.ID', 'food', 'packaging', 'value', 'overall', 'count')
        columns.binds = f"`shop.ID`, avg(r.`food`), avg(r.`packaging`), avg(r.`value`), {summarizeRating}, count()"

        res = cur.execute(
            f"""
                SELECT
					{columns.binds}
                FROM customer_review
                JOIN review as r
                ON `review.id` = r.`id`
                WHERE `shop.ID` = ?
           """,
           (id, )
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/listShopRating')
def listShopRating():
    with SQLite() as cur:
        columns = Columns('shop.ID', 'food', 'packaging', 'value', 'overall', 'count')
        columns.binds = f"""
            `shop.ID`, 
            avg(r.`food`) as `food`, 
            avg(r.`packaging`) as `packaging`, 
            avg(r.`value`) as `value`, 
            {summarizeRating}, {countRowColumn}
            """
        
        
        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "`shop.ID`",
            sortOrderDefault = "DESC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        filters = request.args.getlist("filters")
        filterBinds = ""
        filterValues = []
        for fil in filters:
            filterColumn, filterOperator, filterValue = sanitizeFilterArgs(
                columns - ("shop.ID",)
                ,fil
            )
            if filterColumn in ratingCols.names:
                idx = ratingCols.names.index(filterColumn)
                filterColumn = f"avg(r.`{ratingCols[idx]}`)"
                print(filterColumn)
            if all((filterColumn, filterOperator, filterValue)):
                try:
                    filterBinds = f"{filterBinds} AND {filterColumn} {filterOperator} ?"
                    filterValue =float(filterValue)
                    filterValues.append(filterValue)
                except ValueError as e:
                    filterBinds = ""
                    filterValues = []
        res = cur.execute(
            f"""
                SELECT
					{columns.binds}
                FROM customer_review
                JOIN review as r
                ON `review.id` = r.`id`
                GROUP BY `shop.id`
                HAVING true {filterBinds}
                ORDER BY {sortBy} {sortOrder}
           """,
           filterValues
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')

@app.route('/listShopRatingx')
def listShopRatingx():
    with SQLite() as cur:
        columns = Columns('shop.ID', 'food', 'packaging', 'value', 'overall', 'count')
        columns.binds = f"""
            `shop.ID`, 
            avg(r.`food`) as `food`, 
            avg(r.`packaging`) as `packaging`, 
            avg(r.`value`) as `value`, 
            {summarizeRating}, {countRowColumn}
            """
        
        
        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "`shop.ID`",
            sortOrderDefault = "DESC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        filters = request.args.getlist("filters")
        filterBinds = ""
        filterValues = []
        for fil in filters:
            filterColumn, filterOperator, filterValue = sanitizeFilterArgs(
                columns - ("shop.ID",)
                ,fil
            )
            if filterColumn in ratingCols.names:
                idx = ratingCols.names.index(filterColumn)
                filterColumn = f"avg(r.`{ratingCols[idx]}`)"
                print(filterColumn)
            if all((filterColumn, filterOperator, filterValue)):
                try:
                    filterBinds = f"{filterBinds} AND {filterColumn} {filterOperator} ?"
                    filterValue =float(filterValue)
                    filterValues.append(filterValue)
                except ValueError as e:
                    filterBinds = ""
                    filterValues = []
        res = cur.execute(
            f"""
                SELECT
					{columns.binds}
                FROM customer_review
                JOIN review as r
                ON `review.id` = r.`id`
                GROUP BY `shop.id`
                HAVING true {filterBinds}
                ORDER BY {sortBy} {sortOrder}
           """,
           filterValues
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getCustomer/<string:email>')
def getCustomer(email):
    with SQLite() as cur:
        columns = customerCols
        res = cur.execute(
            f"SELECT {columns.binds} FROM customer WHERE email=?",
            (email,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getCart/<string:email>')
def getCart(email):
    with SQLite() as cur:
        columns = cartCols.prepended("c") 
        columns = columns +Columns('description','category', 'price').prepended("d")
        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM cart_items as c
                LEFT JOIN dish as d ON `dish.name` = d.`name`
		        AND c.`shop.ID`= d.`shop.ID`
                WHERE `customer.email`=?
            """,
            (email,)
        )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/getOrderAddress/<string:email>')
def getOrderAddress(email):
    with SQLite() as cur:
        columns = Columns("shop.name","shop.address","shop.description","customer.name", "customer.address")
        columns.binds = """s.`name` 'shop.name', 
                        s.`address` 'shop.address', 
                        s.`description` 'shop.description',
                        c.`name` 'customer.name', 
                        c.`address` 'customer.address' 
                        """
        res = cur.execute(
            f"""
            SELECT DISTINCT
				{columns.binds}
            FROM cart_items 
            INNER JOIN customer as c ON `customer.email`=`email`  
            INNER JOIN shop as s ON `shop.ID`=ID
            WHERE `customer.email` = ?
            """,
            (email,)
        )
        rows = res.fetchall()
        shoppairs = (r[0:3] for r in rows)      
        try:
            tuples = zip(*shoppairs)
        except ValueError as e:
            print(e)
            return Response("no cart",404)
        rows = [(*tuples,*rows[0][3:])]
        out = dumpRows(rows, columns)
        return Response(out, mimetype='application/json')


@app.route('/listShopByTag/<string:tags>')
def listShopByTag(tags):
    with SQLite() as cur:
        columns = shopCols
        columns = Columns(*shopCols, 'tag.name')

        sortBy, sortOrder = sanitizeSortingArgs(
            columns,
            sortByDefault = "`tag.name`",
            sortOrderDefault = "ASC",
            sortByReq = request.args.get("sortBy"),
            sortOrderReq = request.args.get("sortOrder")
        )

        tags = tags.split("&") 
        qbinds = ", ".join("?"*len(tags))
        res = cur.execute(
            f"""
                SELECT {columns.binds} FROM shop INNER JOIN shop_tags ON (`ID`=`shop.ID`) WHERE `tag.name` in ({qbinds})
                ORDER BY {sortBy} {sortOrder}
            """
            ,tags
            )
        out = dumpRows(res.fetchall(), columns)
        return Response(out, mimetype='application/json')


@app.route('/picture/<string:id>')
def getShopPicture(id):
    with SQLite() as cur:
        columns = Columns('picture')
        res = cur.execute(
            f"SELECT {columns.binds} FROM shop WHERE ID=?", 
            (id,)
        )
        out = res.fetchone()
        if out is not None:
            out, *_ = out
        if out:
            return Response(out, mimetype='image/png')
        else:
            return Response("no image",404)

@app.route('/picture/<string:id>/<string:name>')
def getDishPicture(id, name):
    with SQLite() as cur:
        columns = Columns('picture')
        res = cur.execute(
            f"SELECT {columns.binds} FROM dish WHERE `shop.ID`=? AND `name`=?", 
            (id,name)
        )
        out = res.fetchone()
        if out is not None:
            out, *_ = out
        if out:
            return Response(out, mimetype='image/png')
        else:
            return Response("no image",404)
        

@app.route('/updateCart', methods=['POST'])
def updateCart():
    req = request.form
    if all(cartCols.isIn(req)):
        with SQLite() as cur:
            columns = Columns(*req.keys())
            qbinds = ", ".join("?"*len(columns))
            res = cur.execute(
                f"INSERT OR REPLACE INTO cart_items ({columns.binds}) VALUES({qbinds})", 
                [*req.values()]
            )            
            print(f"INSERT OR REPLACE INTO cart_items ({columns.binds}) VALUES({qbinds})")
            #drop all rows without positive quantity
            res = cur.execute(
                "DELETE FROM cart_items WHERE quantity<1"
            )
            print(cur.rowcount)
            return Response()
    else:
        return Response("oops",422)

    return req

@app.route('/getNearest/<string:address>', methods=['get'])
def getNearest(address):
    with SQLite() as cur:
        res = cur.execute(
        f"""
        select s.`address` from shop  as s
        LEFT JOIN address_location as a
        on s.`address` = a.`address`
        WHERE `long` IS  NULL
        OR `lat` IS NULL
		UNION SELECT ?
        WHERE NOT EXISTS(
            SELECT 1
            FROM address_location
            WHERE `address` = ?
        );
        """
        ,
        (address,address)
        )
        uncoded = res.fetchall()
        for row in uncoded:
            uncoded_address, = row
            cacheLocation(uncoded_address)
        columns =shopCols.prepended("s") +Columns("long", "lat")

        res = cur.execute(
        f"""
        SELECT distinct {shopCols.nulls} `long`, `lat` FROM address_location
        WHERE `address` = ?
        UNION ALL
        select distinct {columns.binds} from shop  as s
        LEFT JOIN address_location as a
        on s.`address` = a.`address`
        """,
        (address,)
        )
        target = res.fetchone()

        shop_coordinates = res.fetchall()
        *_, targetLong, targetLat = target

        shops = []
        for shop  in shop_coordinates:
            *shopID, shopLong, shopLat = shop

            dist = haverSineDistance(targetLong, targetLat, shopLong, shopLat)
            shopd = (
                *shopID,
                shopLong,
                shopLat,
                dist
            )
            shops.append(shopd)
        
        maxRange = request.args.get("range")
        if maxRange and maxRange.isdecimal():
            shops=list(filter(lambda x:x[-1]<=int(maxRange), shops))

        shops.sort(key=lambda x:x[-1])
        
        limit = request.args.get("limit")
        if limit and limit.isdecimal():
            shops=shops[:int(limit)]

        out = dumpRows(shops, columns+("distance",))
        return Response(out, mimetype='application/json')

@app.route('/getMostOrdered/<string:id>')
def getMostOrdered(id):
    with SQLite() as cur:
        columns = dishCols

        res = cur.execute(
            f"""
		SELECT {columns.binds}, IFNULL(sum(`quantity`),0) from dish as d
		LEFT join order_items as o
		ON d.`name` = o.`dish.name`
		WHERE d.`shop.ID` = ?
		GROUP BY d.name
		ORDER by sum(`quantity`) DESC
	   """,
            (id,)
        )
        out = dumpRows(res.fetchall(), columns+("count",))
        return Response(out, mimetype='application/json')


@app.route('/getOrderLocation/<string:email>', methods=['get'])
def getOrderLocation(email):
    with SQLite() as cur:
        columns = Columns( "long", "lat")
        res = cur.execute(
        f"""
        select s.`address` from shop  as s
	JOIN cart_items as c
	ON c.`shop.ID` = s.`id`
        LEFT JOIN address_location as a
        on s.`address` = a.`address`
        WHERE `long` IS  NULL
        OR `lat` IS NULL;
        """
        )
        uncoded = res.fetchall()
        for row in uncoded:
            uncoded_address, = row
            cacheLocation(uncoded_address)

        res = cur.execute(
        f"""
        SELECT distinct c.`address`, {columns.binds} FROM customer as c
        LEFT JOIN address_location as a
        ON c.`address` = a.`address`
        WHERE c.`email` = ?
        """,
        (email,)
        )
        target = res.fetchone()
        target_ad, *target_loc = target
        if any( x is None for x in target_loc):
            target_loc = cacheLocation(target_ad)[-2:]

        res = cur.execute(
        f"""
        SELECT distinct {columns.binds} FROM cart_items as c
        JOIN shop as s
	ON s.`id` = c.`shop.ID`
	JOIN address_location as a
	ON s.`address` = a.`address`
	WHERE c.`customer.email` = ?
        """,
        (email,)
        )
        rows = []
        res = res.fetchall()
        for r in res:
            dist = haverSineDistance(*target_loc, *r)
            rows.append(
                (
                    *r,
                    dist
                )
            ) 
        reverseReq  = request.args.get("reverse")
        if reverseReq == "True":
            reverse = True
        else:
            reverse = False
        rows = sorted(rows, key= lambda x:x[-1], reverse=reverse)
        out = dumpRows(rows, columns)
        return Response(out, mimetype='application/json')	


def cacheLocation(address):
    with SQLite() as cur:
        lat, lng = geoCode(address)
        res = cur.execute(
            f"INSERT OR REPLACE INTO address_location (address, long, lat) VALUES(?,?,?)", 
            (address, lng, lat)
        )
        return address, lng, lat


def sanitizeSortingArgs(columns,sortByDefault, sortOrderDefault = "ASC", sortByReq=None, sortOrderReq=None):
    sortBy = sortByDefault
    if sortByReq in columns:
        idx = columns.index(sortByReq)
        sortBy = columns.names[idx]
    if sortOrderReq == "DESC":
        sortOrder = "DESC"
    elif sortOrderReq == "ASC":
        sortOrder = "ASC"
    else:
        sortOrder = sortOrderDefault
    return sortBy, sortOrder


def sanitizeFilterArgs(columns, filterByReq):
    try:
        filterByReq,testReq,value = filterByReq.split(":",2)
        if filterByReq in columns:
            idx = columns.index(filterByReq)
            filterBy = columns.names[idx]
            if testReq in ratingOperators:
                test = ratingOperators[testReq]
                return filterBy, test, value
        return None, None, None
    except ValueError as e:
        return None, None, None
            



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5027)
