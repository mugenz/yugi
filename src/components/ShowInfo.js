import React, {Component} from 'react';
import Img from 'react-image';
import '../App.css';

export default class ShowInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            status : 'selected'
        }
    }
    componentDidMount(){
        this.props.CardInfo.pos.y = 150
        this.props.CardInfo.pos.x = 150
        this.setState({status : 'show'})
    }
    render(){
        const divStyle = {
            //transform: 'rotate('+this.props.chars.pos.rot+'deg)',
            top: this.props.CardInfo.pos.y,
            left: this.props.CardInfo.pos.x,
            //display: this.props.chars.pos.filtered,
            transition: 'all 0.7s ease-in-out'
          };
        return(
            <div className={this.props.CardInfo.pos.box} style={divStyle}>
                
                <Img src={['http://52.57.88.137/api/card_image/'+this.props.CardInfo.name]}
                        className={this.state.status}
                        //onMouseEnter = {(e) => this.showCard(e)} 
                        //onMouseLeave = {(e) => this.showCard(e)}
                        //onClick = {(e) => this.showDetails(e)}
                />
                <div>{this.props.CardInfo.text}</div>
            </div>
        )
    }
}
