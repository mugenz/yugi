import React, { Component } from 'react'; 
import axios from 'axios';
import Card from './Card.js';
import Selfld from './Selfld';
import '../App.css';
import { FormGroup, FormControl, ControlLabel,Button,ButtonToolbar, Checkbox } from "react-bootstrap";


export default class start extends Component{
     constructor(){
         super();
         this.state = {
             showBTN : false,
             cardsList : [],
             error : null         
	}

    }     
buildCardList = (card)=>{
    console.log('card before set state');
    console.log(card);       
    this.setState({cardsList: card});
}
componentDidMount(){
    let cardNames = ['Burial from a Different Dimension','Charge of the Light Brigade','Infernoid Antra',
        'Infernoid Attondel','Infernoid Decatron','infernoid Devyaty','Infernoid Harmadik','Infernoid Onuncu',
        'Infernoid Patrulea','Infernoid Pirmais','Infernoid Seitsemas','Lyla, Lightsworn Sorceress','Monster Gate',
        'One for One','Raiden, Hand of the Lightsworn','Reasoning','Time-Space Trap Hole','Torrential Tribute','Upstart Goblin','Void Seer'];

    let url = 'http://52.57.88.137/api/card_data/';
    let cards = [];
    //let tempo = [];
    

    cardNames.forEach (card =>(
    axios.get(url + card)
    .then(res => { 
    res.data.data.filtered = false
    res.data.data.show = false
    res.data.data.freeze = false
    res.data.data.pos = {
        x: this.minMax(0, 700), 
        y: this.minMax(20, 700),
        rot: this.minMax(-40, 40),
        size: 150,
        box: 'myBox',
        filtered: 'block'}
    cards.push(res.data.data);
    //console.log(res.data.data.name)
    })
))
console.log(cards)
this.buildCardList(cards) 

}     
componentDidUpdate(a,b,c){
    console.log('START - didUpdate')    
}

minMax = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

Filter = (e, type) => {
    this.ClearFilters(e)
    let oldState = []
    oldState = this.state.cardsList
    let newState = oldState.map(obj => {
        if ( (obj[type] != e) && (!obj.filtered) )
        {obj.filtered = true
        obj.pos.x = this.minMax(document.documentElement.clientWidth-170, document.documentElement.clientWidth-50)
        obj.pos.y = this.minMax(document.documentElement.clientHeight-170, document.documentElement.clientHeight-50)}
        return obj
    })
    this.setState({cardsList: newState})
}
ClearFilters = (e) => {
    let oldState = []
    oldState = this.state.cardsList
    let newState = oldState.map(obj => {
        if ( (obj.filtered) ) { 
            obj.filtered = false
            obj.pos.x = this.minMax(50, document.documentElement.clientWidth-200)
            obj.pos.y = this.minMax(50, document.documentElement.clientHeight-200)}
        return obj
    })
    this.setState({cardsList: newState})
}
Scatter = (e) => {
    let oldState = this.state.cardsList;
    let newState = oldState.map(card => {
        if (!card.filtered && !card.show){
            card.pos.x = this.minMax(50, document.documentElement.clientWidth-200)
            card.pos.y = this.minMax(50, document.documentElement.clientHeight-200)
            card.pos.rot = this.minMax(-45, 45)
        }
        return card
    })
    //console.log(as);
    this.setState({cardsList: newState})
}
//function to transfer data through components down->top
SelChoice = (ev, type) => {
    this.Filter (ev, type)
}
Freeze = (name) => {
    let oldState = []
    oldState = this.state.cardsList
    let newState = oldState.map(obj => {
        if ( (obj[name] != name) )
        {obj.freeze = true}
        if (name === 'unfreeze')
        {obj.freeze = false}

        return obj
    })
    this.setState({cardsList: newState})
}
cardShow = (show,name) => {
    if (show == 'SHOW'){
        this.setState({showBTN:true})
    }
    if (show == 'NOTSHOW'){
        this.setState({showBTN:false})
    }
    this.Freeze (name)
}



render(){
   
    return(
       <div className={'CardTable'}>
            <div >
            <ButtonToolbar >  
            <Button  
            className={'btnField'}           				      
                bsSize="large"
                onClick={(e) => this.Scatter(e)}			                                
                disabled={this.state.showBTN}>Scatter</Button>       
            <Button  
            className={'btnField'}            				      
                bsSize="xlarge"
                onClick={(e) => this.ClearFilters(e)}			                                
                disabled={this.state.showBTN}>Clear Filters</Button> 
              
            </ButtonToolbar>
            </div>
            <Selfld type={'name'} cards={this.state.cardsList} SelChoice={this.SelChoice} dis={this.state.showBTN}/>
            <Selfld type={'card_type'} cards={this.state.cardsList} SelChoice={this.SelChoice} dis={this.state.showBTN}/>
          

            {this.state.cardsList.map((card, ind) =>(
                    <Card  key={ind} chars={card} cShow={this.cardShow}/>
                ))
              }
              {this.state.cardsList.length === 0 &&
                   <h2>Please, press Scatter to pick up the deck or just Scatter it ;-)</h2>}

         </div>          
    )     
} 
}