import {useObjects, useOnFrameReload} from '.'
export const useCollisionDetect = (detect, collection = 'other') => {
  const objects = useObjects()
  useOnFrameReload(()=>{
    if(collection == 'every')
      for (const collectionKey in objects.objects) {
        if (objects.objects.hasOwnProperty(collectionKey)) {
          objects.objects[collectionKey].forEach(obj => detect(obj))
        }
      }
    else
      objects.objects[collection].forEach(obj => detect(obj))
  })
}