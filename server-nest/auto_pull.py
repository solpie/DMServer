import os
from flask import Flask

app = Flask(__name__)

@app.route("/git-pull")
def hello():
    os.system('git pull>git-log.txt')
    return "git pull"

if __name__ == '__main__':
   app.run(port=5555)