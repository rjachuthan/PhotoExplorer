# PhotoExplorer

PhotoExplorer is a Flask-based web application designed to explore and browse
AI-generated images and models from the Civitai API. It offers a modern,
responsive user interface built with TailwindCSS and DaisyUI, providing users
with a seamless experience in discovering and interacting with AI-generated
content.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd photoexplorer
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

## Development Setup

1. **Build the CSS**:
   ```bash
   npx tailwindcss -i ./static/src/css/input.css -o ./static/dist/css/main.css
   ```

2. **Start the Flask development server**:
   ```bash
   flask run
   ```

3. **For development with auto-reload of CSS changes**:
   ```bash
   npx tailwindcss -i ./static/src/css/input.css -o ./static/dist/css/main.css --watch
   ```

## Project Structure

```
photoexplorer/
├── app.py                 # Main Flask application
├── templates/            
│   ├── base.html         # Base template with common layout
│   ├── navbar.html       # Navigation component
│   ├── components/       # Reusable UI components
│   │   ├── cards.html    # Card components for images and models
│   │   └── svg/         # SVG icons
│   └── civitai/          # Civitai-specific templates
│       ├── image_page.html    # Image browsing page
│       ├── model_page.html    # Model browsing page
│       ├── image_grids.html   # Image grid component
│       └── model_grids.html   # Model grid component
├── static/
│   ├── src/             # Source assets
│   │   └── css/         # CSS source files
│   └── dist/            # Compiled assets
├── package.json         # Node.js dependencies
└── tailwind.config.js   # TailwindCSS configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Civitai](https://civitai.com/) for providing the API
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
- [DaisyUI](https://daisyui.com/) for the UI components
- [HTMX](https://htmx.org/) for the dynamic interactions
