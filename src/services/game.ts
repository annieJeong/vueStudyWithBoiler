import { HttpService, LocaServiceResponse, GET, Path, ResponseAdapter } from './core'

export interface GameResponse {
    id: number
    name: string
    description: string
}

export default class GameService extends HttpService {
    @GET('/game')
    async getGame(): LocaServiceResponse<GameResponse[]> {
        return null
    }

    @GET('/game/:id')
    @ResponseAdapter(data => {
        return {
            ...data
        }
    })
    async getCardbyId(@Path('id') id: number): LocaServiceResponse<GameResponse> {
        return null
    }
}
