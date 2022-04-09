import {
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import random from './api';

const App = () => {
  const [start, setStart] = useState(false);
  const [pokemon, setPokemon] = useState({ image: '', name: '' });
  const [name, setName] = useState('');
  const [guessed, setGuessed] = useState(false);
  const [won, setWon] = useState(false);
  const [brightness, setBrightness] = useState('brightness(0)');
  const [victorias, setVictorias] = useState(0);
  const [derrotas, setDerrotas] = useState(0);

  const handleStart = () => {
    setStart(true);
  };

  const handleGuess = () => {
    setGuessed(true);
    if (name.toLowerCase() === pokemon.name) {
      setWon(true);
      setVictorias(victorias + 1);
    } else {
      setWon(false);
      setDerrotas(derrotas + 1);
    }
    setName('');
    setBrightness('brightness(1)');
  };

  const handleRestart = () => {
    setGuessed(false);
    setWon(false);
    setBrightness('brightness(0)');
    setPokemon(random());
  };
  useEffect(() => {
    const getPokemon = async () => {
      setPokemon(random());
    };
    getPokemon();
  }, [start]);
  return (
    <>
      {start && (
        <Center>
          <Stack
            w={{ base: '90%', md: '70%', lg: '60%', xl: '40%' }}
            marginTop={{ base: '2rem', md: '3rem', lg: '4rem' }}
          >
            <Text
              as='h1'
              fontSize={{ base: 'lg', md: 'xl', xl: '2xl' }}
              align='center'
            >
              Quién es este Pokemon?
            </Text>
            <Stack
              direction={{ base: 'column', md: 'row', lg: 'row' }}
              alignItems='center'
              justify='space-between'
            >
              <Image
                src={pokemon.image}
                boxSize={{
                  base: '300px',
                  md: '300px',
                  lg: '400px',
                  xl: '450px',
                }}
                objectFit='cover'
                filter={brightness}
              />
              <Text>{guessed && `The Pokemon is ${pokemon.name}`}</Text>
            </Stack>
            <Stack>
              <Center>
                <Stack
                  direction='row'
                  w={{ base: '100%', md: '90%', lg: '80%' }}
                >
                  <InputGroup>
                    <Input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      isDisabled={guessed}
                    />
                    <Button
                      isDisabled={guessed}
                      onClick={handleGuess}
                      fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                    >
                      Adivinar
                    </Button>
                  </InputGroup>
                </Stack>
              </Center>

              {guessed && (
                <Stack>
                  <Text
                    align='center'
                    fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    my='2rem'
                  >
                    {won ? 'Acertaste!!' : 'Pokemon equivocao'}
                  </Text>
                  <Button onClick={handleRestart}>Volver a Intentar</Button>
                </Stack>
              )}
              <Stack align='center'>
                <Text mt='2rem'>Victorias: {victorias}</Text>
                <Text>Derrotas: {derrotas}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Center>
      )}
      {!start && (
        <Stack minH='100vh' justifyContent='center' alignItems='center'>
          <Text
            as='h1'
            fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}
            align='center'
            fontWeight='bold'
            fontFamily='Press Start 2P'
          >
            Quién es ese Pokemon?
          </Text>
          <Button
            colorScheme='green'
            fontSize={{ base: 'md', md: 'lg', xl: 'lg' }}
            onClick={handleStart}
          >
            Juguemos
          </Button>
        </Stack>
      )}
    </>
  );
};

export default App;
