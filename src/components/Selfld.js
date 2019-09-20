import React from 'react';
import Select from 'react-select';
  
export default class Selfld extends React.Component {
    constructor(props){
        super(props);
       
    }
     
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    //this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption);
    this.props.SelChoice(selectedOption.value, this.props.type);
  }
  clearValues = (type) => {
    let options=this.props.cards.map (card => {
        let NewCard = card[type]
        return NewCard
    })
    let Unique = options.filter(function(item, index){
        return options.indexOf(item) >= index;
    });
    console.log(Unique)
     options = Unique.map (card => {
        let NewCard = {value: card, label: card}
        return NewCard
    })
    console.log(options)
    return options
}
  render() {
    const { selectedOption } = this.state;
 
    return (
      <Select
      className={'selField'}
      placeholder = {'Filter per '+this.props.type}
       isSearchable={true}
       isDisabled={this.props.dis}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.clearValues(this.props.type)}
      />
    );
  }
}