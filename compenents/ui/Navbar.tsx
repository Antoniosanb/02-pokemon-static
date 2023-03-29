import { Spacer, Text, useTheme, Link, Container } from '@nextui-org/react';
import Image from "next/image"
import NextLink from "next/link"

export const Navbar = ({  }) => {

    const { theme } = useTheme()

    return (
        <Container style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0 20px',
            backgroundColor: theme?.colors.gray900.value
        }}>
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="icono de la app"
                width={70}
                height={70}
                priority={true}
            />
            <NextLink href="/" passHref>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text>
            </NextLink>

            <Spacer css={{ flex: 1 }}/>
            <NextLink href="/favorites">
                    <Text color="white" h3>Favoritos</Text>
            </NextLink>
            
        </Container>
    )
}