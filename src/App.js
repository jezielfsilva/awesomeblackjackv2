import React from 'react';
import './App.css';
import styled from 'styled-components';

import photogame from './assets/fundogame.jpg';
import photoheader from './assets/fundoheader.jpg';

import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: url(${photogame});
  background-size: cover;
`;

const MainTitle = styled.h1`
  color: #ffffff;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-shadow: 2px 2px 1px black;
  letter-spacing: 0.04em;
  width: 100%;
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${photoheader});
  background-size: cover;
  background-position: 50%;
`;

const SubTitle = styled.span`
  color: #fcd600;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-shadow: 2px 1px 1px black;
`;

const Text = styled.p`
  color: #ffffff;
  text-shadow: 1px 1px 3px black;
  font-size: 1.3em;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.01em;
  height: 6vh;
  display: flex;
  align-items: flex-end; 
`;

const BoxCards = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContCards = styled.div`
  width: 90vw;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const PointText = styled.span`
  color: #fcd600;
  text-shadow: 1px 1px 1px black;
  font-size: 1.4em;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const TextWin = styled.span`
  color: #ffffff;
  text-shadow: 1px 1px 1px black;
  font-size: 1.5em;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

const TextLoser = styled.span`
  color: #ff0000;
  text-shadow: 1px 1px 1px #000000;
  font-size: 1.5em;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

const BoxButtons = styled.div`
  width: 26vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Click = styled.button`
  width: 8vw;
  height: 5vh;
  background-color: #922105;
  border: 1px solid #922105;
  border-radius: 2px;
  color: #ffffff;
  font-size: 0.9em;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  box-shadow: 1px 1px 3px black;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suits: ["clubs", "hearts", "spades", "diams"],
      cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
      deck: [],
      userCards: [],
      points: 0,
      winner: false,
      loser: false
    }
  }

  componentDidMount() {
    this.createDeck();
  }

  getCardValue = (card) => {
    if (card === "A") {
      return 1;
    }

    if (card === "Q" || card === "J" || card === "K") {
      return 10;
    }

    return Number(card);
  }

  createDeck = () => {
    const { cards, suits } = this.state;
    const deck = [];

    cards.forEach((card) => {
      suits.forEach((suit) => {
        deck.push({
          label: card,
          value: this.getCardValue(card),
          suit
        });
      });
    });

    this.setState({
      deck
    });
  };

  getCard = () => {
    const { deck } = this.state;

    const index = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

    return deck[index];
  };

  newCard = () => {
    const { points } = this.state;
    const card = this.getCard();

    const allPoints = points + card.value;

    this.setState({
      userCards: this.state.userCards.concat(card),
      points: this.state.points + card.value
    });

    if (allPoints > 21) {
      this.setState({
        loser: true
      });
    }

    if (allPoints === 21) {
      this.setState({
        winner: true
      });
    }
  };

  newGame = () => {
    this.setState({
      userCards: [],
      points: 0,
      winner: false,
      loser: false
    });
  };

  renderGame = () => {
    const { userCards } = this.state;

    return (
      <div>
        <ContCards>
          {userCards.map((card) => (
            <Card card={card} />
          ))}
        </ContCards>
      </div>
    );
  };

  render() {
    const { deck, points, winner, loser } = this.state;

    return (
      <Container>
        <MainTitle>AWESOME GAME 21!<SubTitle>BLACKJACK!</SubTitle></MainTitle>
        <Text>Choose a card and good luck!</Text>
        <BoxCards>
          {deck.length > 0 ? this.renderGame() : <span>criando baralho</span>}
        </BoxCards>
        <PointText>{points}</PointText>
        {winner && <TextWin>Parabéns, você ganhou!!!</TextWin>}
        {loser && <TextLoser>Tente novamente!!!!</TextLoser>}
        <BoxButtons>
          {!winner && !loser && (
            <Click onClick={this.newCard}>Get Card</Click>
          )}
          <Click onClick={this.newGame}>Play Again</Click>
        </BoxButtons>
      </Container>
    );
  }
}

export default App;
