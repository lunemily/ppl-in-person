import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from 'src/app/models/settings';

export const pplEvent = 'Local';

export const serverUrl = 'https://toastserv.com:26438';
export const socketUrl = 'wss://toastserv.com:26439';
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
  socketUrl: socketUrl,
  httpOtions: httpOtions,
};

export const sidenav: PPLSettings = {
  showTrainerCard: true,
  howToChallenge: true,
  rules: true,
  prizePools: true,
  schedule: true,
  bingoBoard: true,
  eventIsOver: false,
  eventSupportsQueueState: true,
  leadersToDefeat: 8,
  elitesToDefeat: 4,
  map: true,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: false,
};
