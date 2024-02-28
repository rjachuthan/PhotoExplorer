import requests
from flask import Flask, render_template, render_template_string, request

app = Flask(__name__, template_folder="templates")


@app.route("/")
def home():
    period = request.form.get("periodoptions") or "Day"
    sort = request.form.get("sortoptions") or "Newest"
    nsfw = request.form.get("nsfwoptions") or "None"

    api_address: str = (
        f"https://civitai.com/api/v1/images?period={period}&nsfw={nsfw}&sort={sort}"
    )
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


@app.route("/civitai/images", methods=["POST"])
def civitimages():
    period = request.form.get("periodoptions") or "Day"
    sort = request.form.get("sortoptions") or "Newest"
    nsfw = request.form.get("nsfwoptions") or "None"

    api_address: str = (
        f"https://civitai.com/api/v1/images?period={period}&nsfw={nsfw}&sort={sort}"
    )
    data = requests.get(api_address).json()
    rendered_template = render_template_string(
        """
            {% import "components/cards.html" as cards %}
            {% for item in data['items'] %}
                {{ cards.image_box(url=item.url, stats=item['stats']) }}
            {% endfor %}
        """,
        data=data,
    )
    print(api_address)
    return rendered_template


@app.route("/civitai/models")
def civitmodels():
    api_address: str = "https://civitai.com/api/v1/models?limit=1"
    data = requests.get(api_address).json()
    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
