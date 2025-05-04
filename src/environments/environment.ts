import { HttpHeaders } from '@angular/common/http';
import { PPLSettings } from 'src/app/models/settings';
import { port } from './ports';

export const pplEvent = 'Local';

export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: `https://toastserv.com:${port}`,
  socketUrl: `wss://toastserv.com:${port}`,
  httpOtions: httpOtions,
};

export const features = {
  useQR: true,
};

export const environment = {
  production: false,
};

export const champHasBadge = false;
