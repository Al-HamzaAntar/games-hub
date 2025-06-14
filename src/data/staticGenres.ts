
import { actionAdventureGenres } from './genres/actionAdventure';
import { rolePlayingStrategyGenres } from './genres/rolePlayingStrategy';
import { shooterIndieGenres } from './genres/shooterIndie';
import { casualSimulationGenres } from './genres/casualSimulation';
import { puzzleArcadeGenres } from './genres/puzzleArcade';
import { sportsRacingGenres } from './genres/sportsRacing';
import { specialtyGenres } from './genres/specialtyGenres';

export default [
  ...actionAdventureGenres,
  ...shooterIndieGenres,
  ...rolePlayingStrategyGenres,
  ...casualSimulationGenres,
  ...puzzleArcadeGenres,
  ...sportsRacingGenres,
  ...specialtyGenres,
];
