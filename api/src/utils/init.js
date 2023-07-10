// import { SystemService } from '../services/system';
import { Console } from './console';

const Loader = async () => {
  try {
    // if (await SystemService.Seed()) Console.Info('The initial configuration for System...⚙️');

    Console.Info(`Intialize database...🚀`);
  } catch (error) {
    Console.Error(`Loader -> ${error.message}`);
  }
};

export { Loader };
