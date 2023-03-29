import { Card, Grid } from "@nextui-org/react"
import { FC } from "react"
import { FavoritesCardPokemons } from './FavoritesCardPokemon';

interface Props {
    favoritesPokemons: number[]
}

export const FavoritesPokemons: FC<Props> = ({ favoritesPokemons }) => {

    return (
        <Grid.Container gap={2} direction='row' justify='flex-start'>
            {
              favoritesPokemons.map((id) => {
                return (
                  <FavoritesCardPokemons id={id} key={id} />
                )
              })
            }
        </Grid.Container>
    )
}