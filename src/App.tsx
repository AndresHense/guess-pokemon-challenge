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
    if (name === pokemon.name) {
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
          <Stack w='40%' marginTop='4rem'>
            <Text as='h1' fontSize='3xl' align='center'>
              Quién es este Pokemon?
            </Text>
            <Stack direction='row' alignItems='center' justify='space-between'>
              <Image
                src={pokemon.image}
                boxSize='450px'
                objectFit='cover'
                filter={brightness}
              />
              <Text>{guessed && `The Pokemon is ${pokemon.name}`}</Text>
            </Stack>
            <Stack>
              <Center>
                <Stack direction='row' w='80%'>
                  <InputGroup>
                    <Input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      isDisabled={guessed}
                    />
                    <Button isDisabled={guessed} onClick={handleGuess}>
                      Adivinar
                    </Button>
                  </InputGroup>
                </Stack>
              </Center>

              {guessed && (
                <Stack>
                  <Text align='center' fontSize='2xl' my='2rem'>
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
            fontSize='4xl'
            fontWeight='bold'
            fontFamily='Press Start 2P'
          >
            Quién es ese Pokemon?
          </Text>
          <Button colorScheme='green' size='lg' onClick={handleStart}>
            Juguemos
          </Button>
        </Stack>
      )}
    </>
  );
};

export default App;
