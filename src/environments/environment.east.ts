import { HttpHeaders } from '@angular/common/http';

export const pplEvent = 'East';
export const serverUrl = 'https://toastserv.com:26438';
export const httpOtions = {
  headers: new HttpHeaders({ 'PPL-Event': pplEvent }),
};
export const api = {
  serverUrl: serverUrl,
  httpOtions: httpOtions,
};

export const environment = {
  production: true,
};