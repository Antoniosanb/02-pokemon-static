import { Button, Card, Container, Grid, Text, Pagination } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image";
import { useState } from "react";
import { pokeApi, pokeApiName } from "../../api";
import { Layout } from "../../compenents/layouts";
import { Pokemon, PokemonListResponse, SmallPokemons, Type } from "../../interfaces";
import { localFavorites, pokemonInfo } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    
    const [page, setPage] = useState(false)

    const handleChange = () => {
        !page ? setPage(true) : setPage(false)
    }

  const [isInFavorires, setIsInFavorires] = useState(localFavorites.existFavorites(pokemon.id))

    const onToggleFavorites = () => {
        localFavorites.toggleFavorites( pokemon.id)
        setIsInFavorires(!isInFavorires)

        if (!isInFavorires) {
            confetti({
                zIndex: 999,
                particleCount:100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y:0,
                }
            })
        }
    }

    return (
      <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
              <Card hoverable css={{ padding: '30px'}}>
                  <Card.Body>
                      <Card.Image
                          src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                          alt={pokemon.name}
                          width="100%"
                          height={400}
                      />
                  </Card.Body>
              </Card>
          </Grid>
          <Grid xs={12} sm={8}>
              <Card>
                  <Card.Header css={{displaya: 'flex', justifyContent: 'space-between'}}>
                      <Text h1 transform="capitalize">{pokemon.name}</Text>
                      <Button
                          color="gradient"
                          ghost={!isInFavorires}
                          onClick={onToggleFavorites}
                      >
                          {isInFavorires ? 'En Favoritos' : 'Guardar en Favoritos'}
                      </Button>
                  </Card.Header>
                  <Card.Body>
                      <Text size={30}>Sprites:</Text>

                      <Container direction='row' display='flex' gap={ 0 }>
                          <Image 
                              src={pokemon.sprites.front_default}
                              alt={pokemon.name}
                              width={200}
                              height={200}
                          />
                          <Image 
                              src={pokemon.sprites.back_default}
                              alt={pokemon.name}
                              width={200}
                              height={200}
                              style={{marginLeft: '50px'}}
                          />
                          <Image 
                              src={pokemon.sprites.front_shiny}
                              alt={pokemon.name}
                              width={200}
                              height={200}
                              style={{marginLeft: '50px'}}
                          />
                          <Image 
                              src={pokemon.sprites.back_shiny}
                              alt={pokemon.name}
                              width={200}
                              height={200}
                              style={{marginLeft: '50px'}}
                          />
                      </Container>
                      <div style={{display: 'flex'}}>
                        <div><Text size={30} style={{fontWeight: 'bold'}}>Abilities:</Text>
                        <ul>
                        {pokemon.abilities.map((ability) => {
                            return <li style={{fontSize: '20px'}}>{ability.ability.name}</li>
                        })}
                      </ul></div>
                        <Text size={30} style={{marginLeft: '50px', fontWeight: 'bold'}}>Weight : </Text>
                        <Text style={{marginLeft: '10px', fontSize: '20px', paddingTop: '0.8%'}}>{pokemon.weight}</Text>
                        <Text size={30} style={{fontWeight: 'bold', marginLeft: '50px'}}>Moves:</Text>
                      <div style={{display: 'flex'}}>
                        <ul>
                            {pokemon.moves.map((move, i) => {
                                if (i >= 0 && i <= 4) {
                                    return (
                                        <li>{move.move.name}</li>
                                    )
                                } if (page == true) {
                                    if (i >= 5) {
                                        return (
                                            <li>{move.move.name}</li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                        {pokemon.moves.length > 5 ?
                            <Button size="xs"color='gradient' style={{marginTop: '20%', marginLeft: '25px'}} onClick={handleChange}>
                                {!page ? 'Show More Moves...' : 'Show less Moves...'}
                            </Button> : false}
                        
                      </div>
                      </div>
                  </Card.Body>
              </Card>
          </Grid>
      </Grid.Container>
  </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const names = data.results.map((result, index) => result.name);
    
    return {
        paths: names.map(name => ({
            params: {name}
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    
    const pokemon = await pokemonInfo(name);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
  
    return {
      props: {
        pokemon
      },
      revalidate: 86400,
    }
}

export default PokemonByNamePage

