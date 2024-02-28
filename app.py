import requests
from flask import Flask, render_template, request

app = Flask(__name__, template_folder="templates")


@app.route("/")
@app.route("/civitai/images", methods=["POST"])
def civitimages():
    period = request.form.get("periodoptions") or "Day"
    sort = request.form.get("sortoptions") or "Newest"
    nsfw = request.form.get("nsfwoptions") or "None"

    api_address: str = f"https://civitai.com/api/v1/images?period={period}&nsfw={nsfw}&sort={sort}&limit=4"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


@app.route("/civitai/models")
def civitmodels():
    api_address: str = "https://civitai.com/api/v1/models?limit=1"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
