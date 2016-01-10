import {Component, Injectable, Input} from 'angular2/core'
import Servers from '../services/servers'
import {CsgoServer} from '../models/server'

@Component({
  selector: 'csgo-server',
  template: `
    <div class="csgo-server" [class.loading]="loading" >
      <div *ngIf="!server">
        Sæki upplýsingar fyrir {{host}}...
      </div>
      
      <div class="info" *ngIf="server">
        <a class="server-name" [href]="connectUrl" (click)="connect($event)">{{server.name}} <i class="fa fa-key" *ngIf="server.password_protected"></i></a>

        <span class="password-input-container" [class.visible]="show_password_input">
          <input type="text" [(ngModel)]="password" class="password-input"
            placeholder="Þjónn þarfnast lykilorðs"
            (keyup.enter)="connectWithPassword()"
            (blur)="show_password_input = false"/>
        </span>
        <p class="map">
          <span class="caption">Kort</span> {{server.current_map}}
        </p>

        <p class="players" [class.full]="serverFull">
          <span class="caption">Spilarar</span> <span class="current">{{server.current_players}}</span> / <span class="max">{{server.max_players}}</span>
        </p>

      </div>
      <a href="#" class="refresh-icon" (click)="getServer($event)"><i class="fa fa-refresh" [class.fa-spin]="loading"></i></a>
    </div>
  `
})
@Injectable()
export default class CsgoServerComponent {
  @Input() host: string;
  server: CsgoServer;
  password : string = "";
  loading: boolean = false;
  show_password_input: boolean = false;

  constructor(private servers: Servers) {

  }
  
  ngOnInit() {
   this.getServer(); 
  }

  connect(event : MouseEvent) {
    var url = this.connectUrl;

    if (this.server.password_protected) {
      event.preventDefault();
      this.show_password_input = !this.show_password_input;
    } else {
      window.open(url, '_BLANK');
    }
  }

  connectWithPassword() {
    var url = `${this.connectUrl};password/${this.password}`;
    window.open(url, '_BLANK');
  }
  
  getServer(event) {
    if (this.loading) return;

    if (event) event.preventDefault();

    this.loading = true;
    this.servers.getServer('csgo', this.host).subscribe(data => {
      this.server = data;
      this.loading = false;
    });
  }

  get serverFull() {
    if (this.server) {
      return this.server.current_users >= this.server.max_users;
    }
    return false;
  }

  get connectUrl() {
    if (this.server) {
      return `steam://connect/${this.server.ip}:${this.server.port}`;
    }
  }
}