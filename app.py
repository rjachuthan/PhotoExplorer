from enum import Enum
from urllib.parse import urlencode

import requests
from flask import Flask, render_template, render_template_string, request

app = Flask(__name__, template_folder="templates")


class CivitaiAPI(Enum):
    """Enum class representing the available API endpoints for Civitai."""

    IMAGES = "https://civitai.com/api/v1/images"
    MODELS = "https://civitai.com/api/v1/models"


@app.route("/", methods=["GET"])
@app.route("/civitai/images", methods=["GET", "POST"])
def civitimages() -> str:
    if request.method == "GET":
        url = f"{CivitaiAPI.IMAGES.value}?nsfw=None"
        data = requests.get(url).json()
        return render_template("civitai/image_page.html", data=data)

    if request.method == "POST":
        period = request.form.get("periodoptions") or "Day"
        sort = request.form.get("sortoptions") or "Newest"
        nsfw = request.form.get("nsfwoptions") or "None"

        url = CivitaiAPI.IMAGES.value
        api_address: str = f"{url}?period={period}&nsfw={nsfw}&sort={sort}"

        data = requests.get(api_address).json()
        rendered_template = render_template("civitai/image_grids.html", data=data)

        return rendered_template

    # TODO: Add a return statement to handle where neither GET nor POST method is used
    return ""


@app.route("/civitai/models", methods=["GET", "POST"])
def civitmodels() -> str:
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
    model_api: str = CivitaiAPI.MODELS.value

    if request.method == "GET":
        model_api = f"{model_api}?nsfw=false"
        data = requests.get(model_api).json()

        extracted_data: list[dict[str, str]] = []
        for item in data["items"]:
            image_section = item["modelVersions"][0]["images"]
            if len(image_section) > 0:
                try:
                    url = image_section[0]["url"]
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

        return render_template("civitai/model_page.html", data=extracted_data)

    if request.method == "POST":
        modeltype = request.form.get("modeltype", default="Type")
        sort = request.form.get("sort", default="No Sort")
        nsfw = request.form.get("nsfw", default="off")
        nsfw = "false" if nsfw == "off" else "true"

        params = {"nsfw": nsfw}
        if sort != "No Sort":
            params["sort"] = sort
        if modeltype != "Type":
            params["types"] = modeltype

        try:
            model_api = f"{model_api}?{urlencode(params)}"
            data = requests.get(model_api).json()
        except ConnectionError as err:
            print(f"Connection issues: {err}")
            # TODO: Return an Error Handler Page
            return ""

        extracted_data: list[dict[str, str]] = []
        for item in data["items"]:
            image_section = item["modelVersions"][0]["images"]
            if len(image_section) > 0:
                try:
                    url = image_section[0]["url"]
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

        rendered_template = render_template(
            "civitai/model_grids.html", data=extracted_data
        )
        return rendered_template

    # TODO: Add a return statement to handle where neither GET nor POST method is used
    return ""


@app.route("/imggen", methods=["GET", "POST"])
def text2img():
    return render_template("image_generation/base.html")


if __name__ == "__main__":
    app.run(debug=True)
