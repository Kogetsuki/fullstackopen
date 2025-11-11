import { Navigation, NavList, NavLink } from '../styles/Styles'

const Menu = () => {
  return (
    <Navigation>
      <NavList>
        <NavLink to='/'>blogs</NavLink>
        <NavLink to='/users'>users</NavLink>
      </NavList>
    </Navigation>
  )
}

export default Menu