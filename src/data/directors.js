function getDirectors() {
  return [
    {
      name: "Ridley Scott",
      birthday: new Date(1937, 11, 30),
      country: "UK",
      movies: ["Alien", "The Martian", "Blade Runner"],
    },
    {
      name: "Christopher Nolan",
      birthday: new Date(1970, 7, 30),
      country: "UK",
      movies: ["Inception", "Interstellar", "The Dark Knight"],
    },
    {
      name: "Peter Jackson",
      birthday: new Date(1961, 10, 31),
      country: "New Zeeland",
      movies: ["The Hobbit: An Unexpected Journey", "The Lord of the Rings: The Fellowship of the Ring", "District 9"],
    },
  ];
}

class DirectorsData {
  constructor() {
    this._directors = getDirectors();
  }
  
  getDirectors() {
    // return copy to avaid side effects
    return this._directors.map((director => Object.assign({}, director)));
  }
  getDirectorsByNames(names) {
    return this._directors.filter((director) => names.includes(director.name))
      .map((director => Object.assign({}, director)));
  }
  getDirector(name) {
    const directorsMatch = this._directors.filter((director) => director.name === name);
    if (directorsMatch.length !== 1) {
      throw Error("director does not exist");
    }
    return Object.assign({}, directorsMatch[0]);
  }
  getDirectorsByMovie(title) {
    const directorsMatch = this._directors.filter((director) => director.movies.includes(title))
      .map((director => Object.assign({}, director)));
    return directorsMatch;
  }
}

module.exports = {
  DirectorsData
};