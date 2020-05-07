import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants';
import { GameService } from 'src/app/services';
import { Client } from '@stomp/stompjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  public stompClient: Client;

  public createForm = new FormControl('', Validators.required);

  public joinForm = this.fb.group({
    gameRoomId: ['', Validators.required],
    playerName: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.stompClient = this.gameService.getStompClient();
   }

  ngOnInit(): void {
  }

  public createGame() {
    this.stompClient.subscribe('/user/topic/createdRoom',
      (message) => {
        const gameResponse = JSON.parse(message.body);
        this.gameService.setGameRoomId(gameResponse.gameRoomId);
        this.gameService.setPlayerId(gameResponse.playerId);
        this.gameService.setPlayerMap(gameResponse.playerMap);
        this.router.navigate([ROUTES.GAME + '/' + this.gameService.getGameRoomId()]);
      }
    );
    this.gameService.createGame(this.createForm.value);
  }

  public joinGame() {
    this.gameService.setGameRoomId(this.joinForm.get('gameRoomId').value);

    this.stompClient.subscribe('/user/topic/joinedRoom', (message) => {
      this.gameService.setPlayerId(message.body);
    });
    this.stompClient.subscribe('/topic/playerMap/' + this.gameService.getGameRoomId(), (message) => {
      this.gameService.setPlayerMap(JSON.parse(message.body));
      this.router.navigate([ROUTES.GAME + '/' + this.gameService.getGameRoomId()]);
    });
    this.gameService.joinGame(this.gameService.getGameRoomId(), this.joinForm.get('playerName').value);
  }

}
