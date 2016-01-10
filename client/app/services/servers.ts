import {Http} from 'angular2/http'
import {Injectable} from 'angular2/core'
import {Server} from '../models/server'
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map'

@Injectable()
export default class Servers {
  constructor(private http: Http) {
    
  }
  
  getServers(type: string) : Observable<string[]> {
    console.log("servers gotten?")
    return this.http.get(`/api/servers/${type}`).map((v) => v.json()).map(x => <string[]> x);
  }
  
  getServer(type: string, host: string) {
    return this.http.get(`/api/servers/${type}/${host}`).map(x => x.json());
  }
}