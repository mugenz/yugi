import React, { Component } from 'react';
import Img from 'react-image';
import '../App.css';
import ShowInfo from './ShowInfo';
import Draggable from 'react-draggable';
import { FormGroup, FormControl, ControlLabel,Button, Checkbox } from "react-bootstrap";

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            status : 'not-selected',
            box : 'myBox',
            pos : {
                rot: this.props.chars.pos.rot
            }

        }

    }
    consMe = (e) => {
        console.log(e);
    }
    showCardEN = (e) => {

        if (this.state.status != 'show' && !this.props.chars.filtered){
            this.props.chars.pos.rot = 0
            this.props.chars.pos.box = 'myBoxSel'
            this.setState({status: 'selected'})
        }
        //console.log('MOUSE - ENTER')

    }
    showCardLE = (e) => {
        if (this.state.status != 'show' && !this.props.chars.filtered){
            this.props.chars.pos.rot = this.minMax(-40, 40)
            this.props.chars.pos.box = 'myBox'
            this.setState({status: 'not-selected'})
           // console.log('MOUSE - LE')
        }
    }
    showDetails = (e) => {
        
        if (this.state.status === 'show'){
            //this.props.chars.pos.rot = 0
            this.props.cShow('NOTSHOW','unfreeze')
            this.props.chars.pos.x = this.minMax(50, document.body.clientWidth-200)
            this.props.chars.pos.y = this.minMax(50, document.body.clientHeight-200)
            this.props.chars.pos.box = 'myBox'
            this.props.chars.show = false
            this.setState({status : 'not-selected'})
        } else
        if (!this.props.chars.filtered && !this.props.chars.freeze){
            this.props.cShow('SHOW',this.props.chars.name)
            this.props.chars.pos.rot = 0
            this.props.chars.pos.x = 50
            this.props.chars.pos.y = 100
            this.props.chars.pos.box = 'myBoxShow'
            this.props.chars.show = true
            this.setState({status : 'show'})
        } 
        //console.log('SHOW - DET')
    }
    minMax = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    componentDidUpdate(){
        //console.log('Card - DidUpdate')
    }
    render (){
        const divStyle = {
            transform: 'rotate('+this.props.chars.pos.rot+'deg)',
            top: this.props.chars.pos.y,
            left: this.props.chars.pos.x,
            transition: 'all 0.7s ease-in-out'
          };
        console.log('chaaars',this.props.chars.data[0].card_images[0].image_url);
        return(

                <div className={this.props.chars.pos.box} style={divStyle}>
                    
                    <Img src={[this.props.chars.data[0].card_images[0].image_url]}
                        className={this.state.status}
                        onMouseEnter = {(e) => this.showCardEN(e)} 
                        onMouseLeave = {(e) => this.showCardLE(e)}
                        onClick = {(e) => this.showDetails(e)}
                    />
            
                    {this.state.status === 'show' &&
                        <div className={'Info'}>
                            <div className={'theTitle'}>NAME: {this.props.chars.name}</div>
                            <div className={'theTitle'}>INFO:</div>
                            <div>{this.props.chars.text}</div>
                            <div className={'theTitle'}>Card Type: {this.props.chars.card_type}</div>
                            <div className={'theTitle'}>Type: {this.props.chars.type}</div>
                            <div className={'theTitle'}>Family: {this.props.chars.family}</div>
                            <div className={'theTitle'}>Attack: {this.props.chars.atk}</div>
                            <div className={'theTitle'}>Defence: {this.props.chars.def}</div>
                            <div className={'theTitle'}>Level: {this.props.chars.level}</div>
                        </div>
                    }
                   

             
                </div>

        )
    }
}