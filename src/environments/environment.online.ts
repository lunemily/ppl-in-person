import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';

export const pplEvent = 'Online';

export const serverUrlQual = 'https://toastserv.com:26439';
export const serverUrlProd = 'https://toastserv.com:26438';
export const serverUrl = serverUrlProd;
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
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
  map: false,
};

export const features = {
  useQR: false,
};

export const environment = {
  production: true,
};
