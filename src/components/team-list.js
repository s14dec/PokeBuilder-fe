import React from "react";
import Shortid from "shortid";
import styled from "styled-components";

export const TeamList = props => {
  const getSpriteSrc = member =>
    `https://img.pokemondb.net/sprites/black-white/anim/normal/${member}.gif`;
  return (
    <div>
      <h3 style={{color: 'white'}}>My Team:</h3>
      {props.team.length < 1 ? <p style={{color: 'white'}}>You haven't added any Pokemon yet!</p> : ""}
      <Team>
        {props.team.map(member => (
          <li key={Shortid.generate()}>
            <PokeListItem>
              <Sprite src={getSpriteSrc(member)} alt={member} />
              {member}
            </PokeListItem>
          </li>
        ))}
      </Team>
    </div>
  );
};

const Team = styled.ol`
  margin: 0 0 32px;
  padding: 0 0 0 16px;
  text-align: left;
  text-transform: capitalize;

  li {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }
`;

const PokeListItem = styled.div`
  display: grid;
  grid-template-columns: 64px auto;
  font-size: 1.25rem;
  font-weight: 700;
  font-style: italic;
  width: 300px;
  background: #80807D;
  border: 1px solid #fff2b7;
  border-radius: 5px;
  margin: 0.5rem 0;
  padding: 0.25rem 1rem;
  align-items: center;
  grid-column-gap: 16px;
`;

const Sprite = styled.img`
  max-width: 64px;
  max-height: 56px;
  font-size: 0.75rem;
  color: #57585d`;

export default TeamList;
