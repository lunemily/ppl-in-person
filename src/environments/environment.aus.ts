import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';

export const pplEvent = 'Aus';

export const serverUrlStaging = 'https://toastserv.com:26441';
export const serverUrlProd = 'https://toastserv.com:26438';
export const serverUrl = serverUrlStaging;
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
  httpOtions: httpOtions,
};

export const sidenav: PPLSettings = {
  showTrainerCard: true,
  howToChallenge: true,
  rules: true,
  prizePools: false,
  schedule: false,
  bingoBoard: false,
  eventIsOver: false,
  eventSupportsQueueState: false,
  map: false,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: true,
};
