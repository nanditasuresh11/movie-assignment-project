const express = require("express");
const path = require("path");

const app = express();

const movies = require("./movies_metadata.json");

app.get("/api/ping", (request, response) => {
  response.send("pong!");
});

app.get("/api/movies", (request, response) => {
  const movieList = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));

  response.json(movieList);
});

app.get("/api/movies/:id", (request, response) => {
  const movie = movies.find(
    m => String(m.id) === request.params.id
  );

  if (!movie) {
    return response.status(404).json({
      error: "Movie not found"
    });
  }

  response.json(movie);
});

let port;

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (request, response) => {
    response.sendFile(
      path.join(__dirname, "../build", "index.html")
    );
  });
} else {
  port = 3001;
}

const listener = app.listen(port, () => {
  console.log(
    "Express server running on port",
    listener.address().port
  );
});
