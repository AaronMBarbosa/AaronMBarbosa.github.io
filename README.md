# Aaron Barbosa — Software Engineer Portfolio

A personal portfolio website showcasing my software engineering experience, technical approach, education, interests, and film photography.

**Live site:** [aaronmbarbosa.github.io](https://aaronmbarbosa.github.io/)
**Repository:** [github.com/AaronMBarbosa/AaronMBarbosa.github.io](https://github.com/AaronMBarbosa/AaronMBarbosa.github.io)

## About the Project

This site serves as a concise introduction to who I am as a software engineer and the kind of work I enjoy doing. It highlights my experience modernizing business-critical applications, improving performance and usability in mature systems, and building dependable software with C#, .NET, SQL Server, and JavaScript.

The design uses a responsive bento-style layout, subtle motion, bold gradients, and interactive details to create a portfolio that feels modern while still reflecting my personality. A separate photography experience presents selections from my 35mm archive through an interactive image trail.

## Features

* Responsive bento-grid portfolio layout
* Current and previous professional experience
* Technical skills and engineering philosophy
* Education and personal interests
* Interactive hover lighting and scroll-reveal effects
* Dedicated interactive film photography gallery
* Keyboard-accessible navigation and visible focus states
* Reduced-motion support for accessibility
* Mobile, tablet, and desktop layouts
* Automatic copyright year
* No framework, build process, or backend required

## Built With

* **HTML5** for structure and semantic content
* **CSS3** for the responsive layout, animations, and visual design
* **Vanilla JavaScript** for interactive effects and gallery behavior
* **GitHub Pages** for hosting and deployment
* **Google Fonts** using DM Sans and Space Mono

## Project Structure

```text
AaronMBarbosa.github.io/
├── index.html          # Main portfolio page
├── style.css           # Main portfolio styles
├── script.js           # Card interactions and reveal animations
├── photo.html          # Interactive photography page
├── style2.css          # Photography page styles
├── script2.js          # Photography trail behavior
├── your-picture.jpg    # Portfolio portrait
├── GM.png              # General Motors logo
├── photos/             # Photography archive
└── README.md
```

## Running Locally

The site does not require any dependencies or installation. Clone the repository and start a basic local web server:

```bash
git clone https://github.com/AaronMBarbosa/AaronMBarbosa.github.io.git
cd AaronMBarbosa.github.io
python -m http.server 8000
```

Then open http://localhost:8000 in a browser.

Opening `index.html` directly also works for most of the site, but a local server is recommended so that image paths and browser behavior match the deployed version.

## Deployment

The website is hosted with GitHub Pages and deploys from the repository's `main` branch.

To publish an update:

1. Make and test the changes locally.
2. Commit the updated files.
3. Push the commit to `main`.
4. GitHub Pages will rebuild and publish the site automatically.

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Photography Gallery

The photography page loads a randomized pool of images from the `photos` directory. Visitors can move their cursor, drag, or tap to create a layered trail of photographs across the screen.

The current script expects numbered image files in either of these formats:

```text
photos/1.jpg
photos/2.JPG
photos/3.jpg
...
```

When adding or removing images, update the `TOTAL_IMAGES` value near the top of `script2.js` so it matches the highest numbered image in the archive.

## Accessibility

The site includes:

* Semantic landmarks and heading structure
* A skip-to-content link
* Descriptive link and image text
* Keyboard-visible focus states
* Responsive typography and layouts
* Support for `prefers-reduced-motion`
* A non-JavaScript notice for the interactive gallery

## Contact

* [Email](mailto:aambar1101@icloud.com)
* [LinkedIn](https://www.linkedin.com/in/aaron-barbosa-1268311a4/)
* [GitHub](https://github.com/AaronMBarbosa)

---

Designed and built by Aaron Barbosa.
