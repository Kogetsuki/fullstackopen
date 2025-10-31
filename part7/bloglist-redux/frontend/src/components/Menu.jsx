const Menu = () => {
  const padding = {
    paddingRight: 5
  }


  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      <a href='/' style={padding}>blogs</a>
      <a href='/users' style={padding}>users</a>
    </div>
  )
}

export default Menu