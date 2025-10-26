import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'


const VisibilityFilter = () => {
  const dispatch = useDispatch()


  return (
    <>
      <input
        type='radio'
        name='filter'
        onChange={() =>
          dispatch(filterChange('ALL'))}
      />
      all
      <input
        type='radio'
        name='filter'
        onChange={() =>
          dispatch(filterChange('IMPORTANT'))}
      />
      important
      <input
        type='radio'
        name='filter'
        onChange={() =>
          dispatch(filterChange('NONIMPORTANT'))}
      />
      nonimportant
    </>
  )
}


export default VisibilityFilter