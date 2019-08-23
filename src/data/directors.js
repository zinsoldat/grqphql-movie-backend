module.exports = {
  getDirectors: function getDirectors() {
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
};