
export interface Server {
  name: string; 
  status: string; 
  ip: string;
  password_protected: boolean;
  ping: number;
  port: number;
  current_users: number;
  max_users: number;
}

export interface Player {
  name: string;
  time: number;
  score: number;
}

export interface CsgoServer extends Server {
  current_map: string; 
  game_mode: string;
  players?: Player[];
}

export interface ChatServer extends Server {
  type: string;
}