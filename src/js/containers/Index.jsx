import React,{PropTypes} from 'react';
import { createStore,bindActionCreators } from 'redux';


class Index extends React.Component{
  componentWillMount(){
    
  }
  render(){
    return (
      <div>
        {this.props.children||'加载中'}
      </div>
    )
  }
}

export default Index