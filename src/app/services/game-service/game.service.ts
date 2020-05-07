import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private stompClient: Client;

  private isConnected = false;

  private gameRoomId: string;

  private playerId: string;

  private playerMap;

  constructor() { }

  public initializeSocket() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://192.168.4.34:8080/coup'),
      onConnect: () => this.isConnected = true
    });
    this.stompClient.activate();
  }

  public connectedToSocket(): boolean {
    return this.isConnected;
  }

  public getStompClient(): Client {
    return this.stompClient;
  }

  public createGame(playerName: string) {
    this.stompClient.publish({destination: '/game/create', body: playerName});
  }

  public joinGame(gameRoomId: string, playerName: string) {
    this.stompClient.publish({destination: '/game/join/' + gameRoomId, body: playerName});
  }

  public setGameRoomId(id: string) {
    this.gameRoomId = id;
  }

  public setPlayerId(id: string) {
    this.playerId = id;
  }

  public setPlayerMap(playerMap) {
    this.playerMap = playerMap;
  }

  public getGameRoomId(): string {
    return this.gameRoomId;
  }

  public getPlayerId(): string {
    return this.playerId;
  }

  public getPlayerMap() {
    return this.playerMap;
  }

}
