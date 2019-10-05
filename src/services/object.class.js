export class Object {
  id = null
  _position = Array(2)
  height = null
  width = null
  type = 'other'
  constructor(id, type = 'other', top = 0, left = 0, width = 0, height = 0){
    this.id = id
    this._position[0] = top
    this._position[1] = left
    this.width = width
    this.height = height
    this.type = type
  }

  set top(top){
    this._position[0] = top
  }

  get top(){
    return this._position[0]
  }

  set left(left){
    this._position[1] = left
  }

  get left(){
    return this._position[1]
  }

  get position(){
    return {top: this._position[0], left: this._position[1]}
  }
  get positionArray(){
    return this._position
  }
}