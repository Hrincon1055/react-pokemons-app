/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { fetchAllPokemos } from "../helpers/fetchAllPokemos";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const usePokemon = () => {
  // state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // effect
  useEffect(() => {
    fetchAllPokemos().then((pokemons) => {
      setIsLoading(false);
      setPokemons(pokemons);
    });
  }, []);
  return {
    isLoading,
    pokemons,
  };
};
