import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';
import { port } from './ports';

export const pplEvent = 'West';

export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};

export const api = {
  serverUrl: `https://toastserv.com:${port}`,
  socketUrl: `wss://toastserv.com:${port}`,
  httpOtions: httpOtions,
};

export const sidenav: PPLSettings = {
  showTrainerCard: true,
  howToChallenge: true,
  rules: true,
  prizePools: true,
  schedule: false,
  bingoBoard: true,
  eventIsOver: false,
  eventSupportsQueueState: false,
  leadersToDefeat: 8,
  elitesToDefeat: 4,
  map: true,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: true,
};
