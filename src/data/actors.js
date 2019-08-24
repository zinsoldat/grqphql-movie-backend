
function getActors() {
  return [
    {
      name: "Leonardo DiCaprio",
      birthday: new Date(1974, 11, 11),
      country: "USA",
      movies: ["Inception",],
    },
    {
      name: "Joseph Gordon-Levitt",
      birthday: new Date(1981, 2, 17),
      country: "USA",
      movies: ["Inception",],
    },
    {
      name: "Ellen Page",
      birthday: new Date(1987, 2, 21),
      country: "Canada",
      movies: ["Inception",],
    },
    {
      name: "Tom Hardy",
      birthday: new Date(1977, 9, 15),
      country: "UK",
      movies: ["Inception",],
    },

    {
      name: "Christian Bale",
      birthday: new Date(1974, 1, 30),
      country: "UK",
      movies: ["The Dark Knight",],
    },
    {
      name: "Heath Ledger",
      birthday: new Date(1979, 4, 4),
      country: "Australia",
      movies: ["The Dark Knight",],
    },
    {
      name: "Aaron Eckhart",
      birthday: new Date(1968, 3, 12),
      country: "USA",
      movies: ["The Dark Knight",],
    },
    {
      name: "Michael Caine",
      birthday: new Date(1933, 3, 14),
      country: "UK",
      movies: ["The Dark Knight",],
    },
    {
      name: "Morgan Freeman",
      birthday: new Date(1937, 6, 1),
      country: "USA",
      movies: ["The Dark Knight",],
    },

    {
      name: "Ian McKellen",
      birthday: new Date(1939, 3, 25),
      country: "UK",
      movies: ["The Hobbit: An Unexpected Journey",],
    },
    {
      name: "Martin Freeman",
      birthday: new Date(1971, 10, 8),
      country: "UK",
      movies: ["The Hobbit: An Unexpected Journey",],
    },
    {
      name: "Richard Armitage",
      birthday: new Date(1971, 8, 22),
      country: "UK",
      movies: ["The Hobbit: An Unexpected Journey",],
    },

    {
      name: "Tom Skerritt",
      birthday: new Date(1933, 8, 25),
      country: "USA",
      movies: ["Alien",],
    },
    {
      name: "Sigourney Weaver",
      birthday: new Date(1949, 10, 8),
      country: "USA",
      movies: ["Alien",],
    },
    {
      name: "Veronica Cartwright",
      birthday: new Date(1949, 4, 20),
      country: "UK",
      movies: ["Alien",],
    },
    {
      name: "Harry Dean Stanton",
      birthday: new Date(1926, 7, 14),
      country: "USA",
      movies: ["Alien",],
    },
  ];
}

class ActorsData {
  constructor() {
    this._actors = getActors();
  }

  getActors() {
    // return copy to avaid side effects
    return this._actors.map((actor => Object.assign({}, actor)));
  }
  getActorsByName(names) {
    return this._actors.filter((actor) => names.includes(actor.name))
      .map((actor => Object.assign({}, actor)));
  }
  getActor(name) {
    const actorsMatch = this._actors.filter((actor) => actor.name === name);
    if (actorsMatch.length !== 1) {
      throw Error("actor does not exist");
    }
    return Object.assign({}, actorsMatch[0]);
  }
  getActorsByMovie(title) {
    const actorsMatch = this._actors.filter((actor) => actor.movies.includes(title))
      .map((actor => Object.assign({}, actor)));
    return actorsMatch;
  }
}

module.exports = ActorsData;