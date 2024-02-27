import requests
from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")


@app.route("/")
@app.route("/images")
def index():
    api_address: str = "https://civitai.com/api/v1/images?period=Day&nsfw=None"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
