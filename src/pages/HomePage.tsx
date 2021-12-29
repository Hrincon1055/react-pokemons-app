import React, { useState, ChangeEvent } from "react";
import Loading from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

//? Inicio
export default function HomePage() {
  // use
  const { isLoading, pokemons } = usePokemon();
  // state
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  // funciones
  const filteredPokemons = (): Pokemon[] => {
    if (search.length === 0) {
      return pokemons.slice(currentPage, currentPage + 5);
    }
    const filtered = pokemons.filter((poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 5);
  };
  const nextPage = () => {
    if (
      pokemons.filter((poke) =>
        poke.name.toLowerCase().includes(search.toLowerCase())
      ).length >
      currentPage + 5
    ) {
      setCurrentPage(currentPage + 5);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };
  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  // render
  return (
    <div className="mt-5">
      <h1>Listado de pokemos</h1>
      <hr />
      <input
        type="text"
        className="mb-2 form-control"
        placeholder="Buscar Pokemon"
        value={search}
        onChange={onSearchChange}
      />
      <button className="btn btn-primary" onClick={prevPage}>
        Antror
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={nextPage}>
        Siguienter
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemons().map(({ id, name, pic }) => (
            <tr key={id}>
              <td style={{ width: 100 }}>{id}</td>
              <td style={{ width: 150 }}>{name}</td>
              <td>
                <img src={pic} alt={name} style={{ height: 75 }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <Loading />}
    </div>
  );
}
