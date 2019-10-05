import React, {PureComponent} from 'react';
import {TimerContext} from '../contexts/TimerContext'
import {ObjectsContext} from '../contexts/ObjectsContext'
import {Object as ObjectClass} from '../services/object.class'

class Game extends PureComponent {
  objects = []
  constructor(props){
    super(props)
    this.state = {
      timer: 0
    }
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      this.setState({timer: this.state.timer + 1})
    }, 1000/this.props.framesPerSec);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  registerObject = (name, collection = 'other') => {
    if(this.objects[collection] === undefined) this.objects[collection] = []
    if(this.objects[collection].filter(item => item.id == name).length == 0)
      return this.objects[collection].push(new ObjectClass(name, collection))
  }

  unregisterObject = (name, collection = 'other') => {
    this.objects[collection] = this.objects[collection].filter(item => item.id != name)
  }

  getObject = (name, collection = 'other') => {
    return this.objects[collection].filter(item => item.id == name)[0]
  }

  render(){
    return (
      <ObjectsContext.Provider value={{objects: this.objects, registerObject: this.registerObject, unregisterObject: this.unregisterObject, getObject: this.getObject}}>
        <TimerContext.Provider value={this.state.timer}>
          {this.props.children}
        </TimerContext.Provider>
      </ObjectsContext.Provider>
    );
  }
}

export default Game;
