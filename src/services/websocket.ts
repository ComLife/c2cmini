import Taro, { SocketTask } from '@tarojs/taro';
import Config from '../const/config';
import { ab2json, sendWrapper } from '../utils/websocket-util';

export default class WebSocket {
  private readonly HEART_BEAT_CHEEK_INTERVAL = 15; // 15s
  private readonly HEART_BEAT_CHEEK_DATA = 'ping';

  private static instance: WebSocket;
  private readonly rws = Taro.connectSocket({ url: Config.wsPrefix + Config.wsUrl });
  private innerTask: SocketTask;

  private constructor() {}

  private heartBeat() {
    setInterval(() => {
      //     this.rws.then(task =>
      //       task.onOpen(() => {
      //         task.send({ data: this.HEART_BEAT_CHEEK_DATA });
      //       }),
      //     );
      console.log(this.HEART_BEAT_CHEEK_DATA, new Date());
    }, this.HEART_BEAT_CHEEK_INTERVAL * 1000);
  }

  static getInstance() {
    if (!WebSocket.instance) {
      WebSocket.instance = new WebSocket();
      WebSocket.instance.heartBeat();
    }
    return WebSocket.instance;
  }

  private onOpenImpl = task => () => {
    this.innerTask = task;
  };

  public connect() {
    this.rws.then(task => {
      task.onOpen(this.onOpenImpl(task));
    });
  }

  public send(input) {
    if (!this.innerTask || this.innerTask.readyState !== this.innerTask.OPEN) {
      console.warn('--------------- WebSocket send -> state is not OPEN ---------------');
      // 注意重试次数
      this.connect();
      return;
    }
    if (!input) {
      console.warn('--------------- WebSocket send -> input is null ---------------');
      return;
    }
    console.log('task', this.innerTask);
    console.log('taskId=========', this.innerTask.socketTaskId);
    this.innerTask.send({ data: sendWrapper(input) });
  }

  public onMessage(callback) {
    if (!this.innerTask || this.innerTask.readyState !== this.innerTask.OPEN) {
      console.warn('--------------- WebSocket onMessage -> state is not OPEN ---------------');
      return;
    }

    this.innerTask.onMessage((result: Record<string, any>) => {
      if (!result || !result.data) {
        console.warn('--------------- WebSocket onMessage -> result is unavailable ---------------');
        return;
      }
      const { code, data, msg } = ab2json(result.data);
      if (code === '500') {
        console.warn('===========WebSocket code === 500 消息：' + msg);
        return;
      }
      const dataCode = data && data.code;
      if (typeof dataCode === 'string' && dataCode !== '1') {
        console.warn('===========WebSocket code != 1 消息：' + data && data.msg);
        return;
      }
      callback && callback(data);
    });
  }

  public close() {
    this.rws.then(task => task.close({ code: 1000, reason: '克黎萎了' }));
  }
}
