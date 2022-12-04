import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(
    private apiservice: ApiService
  ) { }
  sendNotification(playerIds, title, description){
    const body = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  app_id:environment.oneAppID,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  include_player_ids: playerIds,
  contents: {
    en: `${description}`
  },
  headings: {
    en: `${title}`
  },
  data: {message :'message'}
};
this.apiservice.postNotification(body).subscribe((res)=>{
  console.log(res);
});
}
}
