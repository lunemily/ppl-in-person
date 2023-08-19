import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from 'src/app/models/settings';

export const pplEvent = 'Local';

export const serverUrl = 'https://toastserv.com:26438';
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
  schedule: true,
  bingoBoard: true,
  eventIsOver: false,
  eventSupportsQueueState: true,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: false,
};
