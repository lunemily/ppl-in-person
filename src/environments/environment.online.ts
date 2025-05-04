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

export const features = {
  useQR: false,
};

export const environment = {
  production: true,
};

export const champHasBadge = false;
