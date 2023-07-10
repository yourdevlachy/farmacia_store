import { version, description } from '../../../package.json';

export const SystemBLL = {
  HealthCheck: (req, res) => {
    res.status(200).json('It works!');
  },
  SystemVersion: (req, res) => {
    res.status(200).json(`${version}`);
  }
};
