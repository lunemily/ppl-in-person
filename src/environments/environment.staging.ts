import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from '../app/models/settings';

export const pplEvent = 'East';

export const serverUrl = 'https://toastserv.com:26439';
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
};

export const environment = {
  production: true,
};
