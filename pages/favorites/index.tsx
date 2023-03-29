
import { Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Layout } from "../../compenents/layouts";
import { FavoritesPokemons } from "../../compenents/pokemon";
import { NoFavorites } from "../../compenents/ui";
import { localFavorites } from "../../utils";

const Favorites = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons())
  },[])
    
    return (
        <Layout title="Pokemons Favoritos">
          {favoritesPokemons.length === 0
            ? (<NoFavorites />)
            : (
              <FavoritesPokemons favoritesPokemons={favoritesPokemons}/>
            )
          }
        </Layout>
    )
}

export default Favorites;