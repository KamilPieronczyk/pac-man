import {useContext, useEffect} from 'react'
import {ObjectsContext} from '../contexts/ObjectsContext'

export const useObjects = (name, collection = 'other') => {
  const objects = useContext(ObjectsContext)

  useEffect(()=>{
    if(name !== undefined) {
      objects.registerObject(name, collection)
      return () => {
        objects.unregisterObject(name, collection)
      }
    }
  },[])

  return objects
}



