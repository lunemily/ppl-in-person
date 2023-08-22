import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';

export const pplEvent = 'West';

export const serverUrlQual = 'https://toastserv.com:26441';
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
  showTrainerCard: true,
  howToChallenge: true,
  rules: true,
  prizePools: true,
  schedule: false,
  bingoBoard: true,
  eventIsOver: false,
  eventSupportsQueueState: false,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: true,
};
