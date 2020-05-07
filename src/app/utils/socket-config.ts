import { GameService } from '../services';

export function configureSocket(gameService: GameService) {
    return () => gameService.initializeSocket();
}
