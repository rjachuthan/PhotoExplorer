import requests
from flask import Flask, render_template, render_template_string, request

app = Flask(__name__, template_folder="templates")


@app.route("/")
@app.route("/civitai/images")
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


@app.route("/civitai/models", methods=["GET", "POST"])
def civitmodels():
    api_address: str = "https://civitai.com/api/v1/models"

    if request.method == "GET":
        data = requests.get(api_address).json()
        return render_template("civitmodels.html", data=data)

    if request.method == "POST":
        modeltype = request.form.get("modeltype", default="Type")
        sort = request.form.get("sort", default="No Sort")
        nsfw = request.form.get("nsfw", default="off")
        nsfw = "false" if nsfw == "off" else "true"

        api_address = f"{api_address}?nsfw={nsfw}"
        api_address = f"{api_address}&sort={sort}" if sort != "No Sort" else api_address
        api_address = (
            f"{api_address}&types={modeltype}" if modeltype != "Type" else api_address
        )
        print(api_address)

        data = requests.get(api_address).json()

        extracted_data = []
        for item in data["items"]:
            url = ""
            image_section = item["modelVersions"][0]["images"]
            if len(image_section) > 0:
                try:
                    url = image_section[0]["url"]
                except KeyError:
                    url = ""
            extracted_item = {
                "name": item["name"],
                "creator": item["creator"],
                "type": item["type"],
                "stats": item["stats"],
                "image": url,
            }
            extracted_data.append(extracted_item)

        rendered_template = render_template_string(
            """
                {% import "components/cards.html" as cards %}
                {% for item in data %}
                    {{ cards.model_box(
                        name=item["name"],
                        creator=item["creator"],
                        type=item["type"],
                        stats=item["stats"],
                        image=item["url"]
                    ) }}
                {% endfor %}
            """,
            data=extracted_data,
        )
        return rendered_template


if __name__ == "__main__":
    app.run(debug=True)
