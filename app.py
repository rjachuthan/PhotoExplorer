import requests
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
<<<<<<< HEAD
    api_address: str = "https://civitai.com/api/v1/images?nsfw=None&limit=12&period=Day"

    data = requests.get(api_address).json()
    image_urls = [x["url"] for x in data["items"]]
    return render_template("index.html", data=image_urls)
=======
    api_address: str = "https://civitai.com/api/v1/images?nsfw=None&limit=24&period=Week"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)
>>>>>>> feature/readfromapi


if __name__ == "__main__":
    app.run(debug=True)
