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
    con.close()
    return rowjson

def getPlayers(players):
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    playerstr = ""
    argstuple = ("europe", )
    for i in range (0, len(players)):
        player = players[i]
        team = player[0]
        name = player[1]
        if (i != 0): playerstr += " or"
        playerstr += " (name = ? and team = ?) "
        argstuple = argstuple + (name, team)
    playerstr += " "

    print(argstuple)
    cur.execute("select * from ranks where region = ? and " + playerstr + " order by timestamp;", argstuple)
    rows = cur.fetchall()
    rowjson = json.dumps(rows)
    con.close()
    return rowjson

