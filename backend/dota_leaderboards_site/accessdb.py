#select * from ranks where region = "europe" and rank < 101
import sqlite3
import os.path
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "../ranks.db")

def getTopRanks(count):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    arg = str(count + 1)
    cur.execute("select * from ranks where region = ? and rank < ? order by timestamp;", ("europe", arg))
    rows = cur.fetchall()
    rowjson = json.dumps(rows)
    return rowjson
