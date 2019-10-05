import {createContext} from 'react'

export const ObjectsContext = createContext({
  objects: [],
  unregisterObject: ()=>{},
  registerObject: ()=>{},
  getObject: ()=>{}
})