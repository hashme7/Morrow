import {Redis} from 'ioredis';

export class RedisService{
  private pubClient:Redis;
  private subClient:Redis;
  constructor(private host:string,private port :number,private password?:string){
    this.pubClient = new Redis({host:this.host,port:this.port,password:this.password});
    this.subClient = new Redis({host:this.host,port:this.port,password:this.password});
  }
  getPublisher():Redis{
    return this.pubClient
  }
  getSubcriber():Redis{
    return this.subClient;
  }
}