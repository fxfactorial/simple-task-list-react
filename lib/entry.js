import React from 'react';
import { render, findDOMNode } from 'react-dom';

const { Component } = React;

class Choice extends Component {

  constructor(p) {
    super(p);
    this.state = {items: this.props.points};
  }

  inputChange = (k, e) => {
    if (k === (this.state.items.length - 1)) {
      this.setState({items:[...this.state.items, '']});
      return;
    }
    if (e.target.value === '') {
      this.setState({
	items: this.state.items.filter((_, idx) => idx === k ? false : true)
      });
      return;
    }
    else {
      const items =
    	    this.state.items.map((item, idx) => idx === k ? e.target.value : item);
      this.setState({items});
    }
  }

  render () {
    const span_s = { fontWeight:'bolder', minWidth:'1.5em' };
    const child_d = { minWidth:'100%', paddingLeft:'1.5em', marginTop:'0.50em' };
    const input_s = { borderWidth:0, alignSelf:'center' };
    const li_s = { listStyle:'none', display:'inline-flex' };
    const points = this.state.items.map((item, idx) => {
      return (
	<div style={child_d} key={idx + 1}>
	  <li style={li_s}>
	    <span style={span_s}>{idx + 1}.</span>
	    <input type={'text'}
		   value={item}
		   onChange={this.inputChange.bind(this, idx)}
		   style={input_s}/>
	  </li>
	</div>
      );
    });
    const choice_s = {
      minWidth:'50%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      borderStyle:'groove',
      borderWidth:'0.10em'
    };
    return (
      <div style={choice_s}>
	{points}
      </div>
    );
  }
};

class App extends Component {
  static defaultProps = {
    pros: [
      'Its Tasty!',
      'Its Tasty!',
      'Its Tasty!',
      'Its Tasty!',
      'Its Tasty!'
    ],
    cons: [
      `Makes me fat`,
      `Too expensive`
    ]
  };
  
  render () {
    const header_s = {
      color:'white',
      display:'flex',
      paddingTop:'1em',
      paddingBottom:'1em',
      backgroundColor:'gray',
      justifyContent:'center',
      alignItems:'center'
    };
    const pro_con_s = { display:'flex' };
    const p_s = {
      minWidth: '50%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderStyle:'groove',
      borderWidth:'0.5px',
      paddingTop:'0.5em',
      paddingBottom:'0.5em'
    };
    const choices_s = { display:'flex', minHeight:'300px' };
    return (
      <div>
	<header style={header_s}>
	  <h1>Should I eat at McDonalds? </h1>
	</header>
	<div style={pro_con_s}>
	  <p style={p_s}> PROS </p>
	  <p style={p_s}> CONS </p>
	</div>
	<div style={choices_s}>
	  <Choice points={this.props.pros}/>
	  <Choice points={this.props.cons}/>
	</div>
      </div>
    );
  }
};

render(<App/>, document.getElementById('container'));
