import React, { Component } from "react";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";
import FetchData from "./fetch-data";
import TeamList from "./team-list";



export default class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      value: "",
      team: [],
      isFull: false,
      selectPokemon: () => {}
    };
  }

  async componentDidMount() {
    await this.getBWPokemon();
  }

  async getBWPokemon() {
    const unovaPokemon = await FetchData(
      "https://pokeapi.co/api/v2/pokedex/9/"
    );
    const pokemonData = Object.values(unovaPokemon.pokemon_entries);
    const pokemon = [];
    pokemonData.map(data => pokemon.push(data.pokemon_species.name));
    this.setState({
      pokemon
    });
  }

  selectPokemon = value => {
    const myTeam = this.state.team;
    if (myTeam.length >= 6) {
      this.setState({ isFull: true });
      return;
    } else myTeam.push(value);
    console.log("Selected: ", value);
    console.log(myTeam);
    this.setState({ team: myTeam });
  };

  clearTeam = () => {
    const emptyTeam = [];
    this.setState({
      team: emptyTeam,
      isFull: false
    });
  };

  render() {
    return (
          <Main>
            <h1 style={{ textAlign: "center", color: 'white' }}>Pokemon Black/White Team Builder</h1>
            <p style={{ textAlign: "center", color: 'white' }}>
              Create your Unova dream team!
            </p>
            <PokemonSelect>
              <Autocomplete
                items={this.state.pokemon.map(item => ({
                  id: item,
                  label: item
                }))}
                shouldItemRender={(item, value) =>
                  item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                getItemValue={item => item.label}
                initialValue=""
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={this.selectPokemon}
                renderItem={(item, highlighted) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: highlighted ? "#3e9fe6" : "#fff",
                      color: highlighted ? "#fff" : "#3e9fe6"
                    }}
                  >
                    <li>{item.label}</li>
                  </div>
                )}
              />
            </PokemonSelect>
            {this.state.isFull ? <div>Your team is already full! Only 6 Pokemon per team.</div> : ""}
            <TeamList title="My Team:" team={this.state.team} />
            <Button warn onClick={this.clearTeam}>
              Reset Team
            </Button>
          </Main>
        )}
      }


const Main = styled.div`
  margin: 0 auto;
  max-width: 640px;
  padding: 1rem 2rem;
`;

const PokemonSelect = styled.div`
  width: 200px;
  margin: 32px auto 48px;

  input {
    border-radius: 3px;
    box-shadow: 0 5px 3px 3px rgba(0, 0, 0, 0.25);
    padding: 12px;
    border: none;
    width: 200px;
  }

  li {
    cursor: pointer;
    list-style: none;
    text-transform: capitalize;
    padding: 4px 8px;
  }
`;

const Button = styled.div`
  background: ${props => (props.warn ? "#f64f37" : "#3e9fe6")};
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  letter-spacing: 0.067em;
  display: inline-block;
  margin: 1rem 2rem 1rem 0;
  padding: 0.75rem 1.75rem;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.1s;

  &:hover {
    background: ${props => (props.warn ? "#d8242b" : "#235b94")};
  }
`;


