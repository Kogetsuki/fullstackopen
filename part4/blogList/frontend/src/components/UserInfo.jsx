const UserInfo = ({ user, handleLogout }) => {
  return (
    <>
      {user.name} logged in
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default UserInfo