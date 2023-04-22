import { HttpHeaders } from '@angular/common/http';

export const pplEvent = 'Local';

export const serverUrl = 'https://toastserv.com:26438';
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
  httpOtions: httpOtions,
};

export const sidenav = {
  trainerCard: true,
  howToChallenge: true,
  rules: true,
  prizePools: true,
  schedule: true,
  bingoBoard: true,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: false,
};
