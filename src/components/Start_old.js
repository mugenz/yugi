import React, { Component } from 'react';
import axios from 'axios';


export default class start extends Component{
    constructor(){
        super();
        this.state = {
            cardsList : [],
            error : null
        }

    }
    buildCardList = (card)=>{
        console.log(typeof(card));
        this.setState(previousState => ({
            cardsList: [...previousState.cardsList, card]
        }));
        //this.setState({cardsList: card});
    }
    componentDidMount(){
        let cardNames = ['Burial from a Different Dimension','Charge of the Light Brigade','Infernoid Antra'];
        let url = 'http://52.57.88.137/api/card_data/';
        let cards = []
        cardNames.forEach (card =>(
            axios.get(url+card)
             .then(res => {
                  cards.push(res.data.data);
                    console.log(cards)
                })
        ))
        this.buildCardList(cards)

    }
    componentDidUpdate(){
        console.log(this.state.cardsList.length)
    }

    render(){
        return(
            <div>
                <ul>
                
                    {this.state.cardsList.map(card =>(
                    <li>{card.name}</li>
                    ))
                    }
                </ul>
                {this.state.cardsList.length === 0 &&
                    <h1>Sorry, no data availiable</h1>}
                {
                    this.state.error &&
                    <h1>error calling Api</h1>
                }
            </div>

        )
    }
}