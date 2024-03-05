from enum import Enum

import requests
from flask import Flask, render_template, render_template_string, request

app = Flask(__name__, template_folder="templates")


class CivitaiAPI(Enum):
    """Enum class representing the available API endpoints for Civitai."""

    IMAGES = "https://civitai.com/api/v1/images"
    MODELS = "https://civitai.com/api/v1/models"


@app.route("/", methods=["GET"])
@app.route("/civitai/images", methods=["GET", "POST"])
def civitimages():
    if request.method == "GET":
        data = requests.get(CivitaiAPI.IMAGES.value).json()
        return render_template("index.html", data=data)

    if request.method == "POST":
        period = request.form.get("periodoptions") or "Day"
        sort = request.form.get("sortoptions") or "Newest"
        nsfw = request.form.get("nsfwoptions") or "None"

        url = CivitaiAPI.IMAGES.value
        api_address: str = f"{url}?period={period}&nsfw={nsfw}&sort={sort}"

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

        return rendered_template


@app.route("/civitai/models", methods=["GET", "POST"])
def civitmodels():
    """
    This function handles the '/civitai/models' route, which supports both GET
    and POST requests. For GET requests, it retrieves data from the
    'https://civitai.com/api/v1/models' API and renders the 'civitmodels.html'
    template with the data. For POST requests, it processes the form data,
    constructs the API address with query parameters, retrieves data from the
    API, and renders the template with the extracted data.

    Returns:
        The rendered template for the models with the data.
    """
    api_address: str = CivitaiAPI.MODELS.value

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

        try:
            data = requests.get(api_address).json()
        except ConnectionError as err:
            print(f"Connection issues: {err}")
            return ""

        extracted_data = []
        for item in data["items"]:
            url = "/static/img/image_not_found.png"
            imagesection = item["modelVersions"][0]["images"]
            if len(imagesection) > 0:
                try:
                    url = imagesection[0]["url"]
                except KeyError:
                    url = "/static/img/image_not_found.png"
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
                        image=item["image"]
                    ) }}
                {% endfor %}
            """,
            data=extracted_data,
        )
        return rendered_template


if __name__ == "__main__":
    app.run(debug=True)
