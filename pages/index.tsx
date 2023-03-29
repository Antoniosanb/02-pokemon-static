import { Inter } from '@next/font/google'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { pokeApi } from '../api'
import { Layout } from '../compenents/layouts'
import { PokemonCard } from '../compenents/pokemon'
import { PokemonListResponse, SmallPokemons } from '../interfaces'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons: SmallPokemons[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  
  return (
    <>
      <Layout title='Listado de Pokemons'>
        <Grid.Container gap={2} justify='flex-start'>
          {pokemons.map((pokemon) => {
            return (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
            )
          })}
        </Grid.Container>
      </Layout>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemons[] = data.results.map((pokemon, i) => {

    const pokemonsEdit = {
      ...pokemon,
      id: i+1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
    }
    return pokemonsEdit
  })
  
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
