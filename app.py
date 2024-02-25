import requests
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    api_address: str = "https://civitai.com/api/v1/images?nsfw=None&limit=24&period=Week"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
