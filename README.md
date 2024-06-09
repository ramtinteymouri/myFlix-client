## Overview

myFlix is a web application for movie enthusiasts. It allows users to browse and search for movies, view details about each movie, and interact with the movie community. The project is built using ReactJS and utilizes modern web development techniques.

## Project Structure

The project contains the following files:

- `index.html`: The main HTML file that serves as the entry point for the application.
- `index.scss`: The main SCSS file for styling the application.
- `index.jsx`: The main React component file that renders the application.
- `components/main-view/main-view.jsx`: Contains the `MainView` component, which displays the list of movies and handles the selection of a movie.
- `components/movie-card/movie-card.jsx`: Contains the `MovieCard` component, which represents each movie in the list.
- `components/movie-view/movie-view.jsx`: Contains the `MovieView` component, which displays the details of a selected movie.

## Installation

To get started with the myFlix project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ramtinteymouri/myFlix-client.git

   ```

2. Navigate to the project directory:

   ```bash
   cd myFlix-client

   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To build the application locally, use the following command:

```bash
parcel src/index.html
```

## File Details

### main-view.jsx

This file contains the `MainView` component, which maintains the state of the movie list and the selected movie. It renders a list of `MovieCard` components and, if a movie is selected, it renders the `MovieView` component to show the details of the selected movie.

### movie-card.jsx

This file contains the `MovieCard` component, which is responsible for displaying the title of each movie. When a movie title is clicked, it triggers the `onMovieClick` function passed as a prop, which updates the selected movie in the `MainView` component.

### movie-view.jsx

This file contains the `MovieView` component, which is responsible for displaying the details of a selected movie, including the movie's image, title, and director.
