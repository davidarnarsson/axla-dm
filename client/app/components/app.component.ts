import {Component} from 'angular2/core';
import {CsgoServer} from '../models/server'
import CsgoServerComponent from './csgo-server'
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map'
import Servers from '../services/servers'

@Component({
  selector: 'app',
  template: `
      <section class="csgo-servers server-section">
        <h2>CS:GO</h2>
        <csgo-server [host]="csgoserver" *ngFor="#csgoserver of csgoservers">></csgo-server>      
        <ts-server host="axlabond.in"></ts-server>
      </section>
  `,  

  directives: [
    CsgoServerComponent
  ]
})
export class AppComponent { 
  public csgoservers: string[] = [];
  
  constructor(public servers: Servers) {
    servers.getServers('csgo').subscribe(data => {
      this.csgoservers = data;
      console.log(this.csgoservers);
    });
  }
}