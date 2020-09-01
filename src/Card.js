import React, { Component } from "react";
import styled from 'styled-components';

import background from './assets/background.jpg';

const Cards = styled.div`
    position: relative;
    width: 120px;
    height: 190px;
    border: 1px solid #000000;
    border-radius: 8px;
    background-color: #ffffff;
    margin-left: 0.5rem;
`;

const InsideCard = styled.div`
    position: absolute;
    top: 18.5%;
    left: 16.5%;
    width: 80px;
    height: 120px;
    border: 1px solid #000000;
    border-radius: 2px;
    background: url(${background});
    background-size: cover;
    background-position: 50%;
`;

class Card extends Component {
    chooseSuit = (suit) => {
        switch (suit) {
            case "clubs":
                return "♣";
            case "hearts":
                return "♥";
            case "spades":
                return "♠";
            case "diams":
                return "♦";
            default:
                return "";
        }
    }

    render() {
        const { card} = this.props;

        return (
            <Cards>
                <InsideCard>
                <span className={`suit suit-${card.suit}`}>
                {this.chooseSuit(card.suit)}</span>
                </InsideCard>
                <span className={`top-value ${card.suit}`}>{card.label}</span>
                <span className={`bottom-value ${card.suit}`}>{card.label}</span>
            </Cards>
        );
    }
}

export default Card;