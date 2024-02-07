import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';
import { port } from './ports';

export const pplEvent = 'Online';

export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};

export const api = {
  serverUrl: `https://toastserv.com:${port}`,
  socketUrl: `wss://toastserv.com:${port}`,
  httpOtions: httpOtions,
};

export const sidenav: PPLSettings = {
  showTrainerCard: false,
  howToChallenge: true,
  rules: true,
  prizePools: true,
  schedule: false,
  bingoBoard: true,
  eventIsOver: false,
  eventSupportsQueueState: true,
  leadersToDefeat: 8,
  elitesToDefeat: 4,
  map: false,
};

export const features = {
  useQR: false,
};

export const environment = {
  production: true,
};
