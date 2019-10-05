import {useEffect, useContext} from 'react'
import {TimerContext} from '../contexts/TimerContext'

export const useOnFrameReload = (callback, arg = []) => {
  const timer = useContext(TimerContext)
  useEffect(()=>{
    callback()
  },[timer, ...arg])
}
