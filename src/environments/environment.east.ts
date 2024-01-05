import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';

export const pplEvent = 'East';

export const prod = {
  server: 'https://toastserv.com:26438',
  socket: 'wss://toastserv.com:26439',
};
export const staging = {
  server: 'https://toastserv.com:26440',
  socket: 'wss://toastserv.com:26441',
};
export const serverUrl = staging.server;
export const socketUrl = staging.socket;
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
  socketUrl: socketUrl,
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
  eventSupportsQueueState: false,
  leadersToDefeat: 8,
  elitesToDefeat: 4,
  map: false,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: true,
};
