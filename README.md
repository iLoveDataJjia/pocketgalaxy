# PocketGalaxy

## Design

Please install [Figma](https://www.figma.com/).

For accessing the project please ask a lead permissions.

## Frontend

Please install [NodeJS](https://nodejs.org/).

Please install VSCode extensions:

- Auto Rename Tag
- ES7+ React/Redux/React-Native snippets
- ESLint
- Highlight Matching Tag
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- XML

To install dependencies, from `./frontend` folder run the command:

```bash
npm install
```

To update dependencies, from `./frontend` folder run the command:

```bash
npm update --save
```

To start implementing you need to run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

Please install [Miniconda](https://docs.conda.io/projects/miniconda/en/latest/index.html).

Please install VSCode extensions:

- Black Formatter
- isort
- Python
- Pylance

To install dependencies on a given `pocketgalaxy` Python environnement, from `./backend` run the command:

```bash
conda create --name pocketgalaxy --channel=conda-forge --file ./requirements.txt
```

Runnable scripts are in `./backend` and need to be run using the newly created `pocketgalaxy` Python environnement. From `./backend`, run [main.py](.\backend\src\main.py).

## Others

For editing images, please install [Paint.net](https://www.getpaint.net/download.html).

Optional VSCode extensions:

- Material Icon Theme
- One Dark Pro
