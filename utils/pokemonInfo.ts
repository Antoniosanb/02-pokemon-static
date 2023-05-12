import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const pokemonInfo = async ( nameOrId: string ) => {

  
  try {

      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`)

      return {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        abilities: data.abilities,
        weight: data.weight,
        moves: data.moves,
      }
      
    } catch (error) {
      return null  
    }

}