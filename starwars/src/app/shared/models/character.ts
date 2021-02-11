export class Character {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  gender: string;
  birthYear: string;
  homePlanet: {
    title: string;
    terrain: string;
    population: string;
  };
  species: Array<{
    name: string;
    averageLifespan: string;
    classification: string;
    language: string;
  }>;
  films: Array<{ title: string; director: string; producer: string; releaseDate: string; }>;
}
