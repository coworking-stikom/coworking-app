import NavbarApp from './navbar'

const Layout = ({ children }) => {
  return (
    <>
      <NavbarApp />
      {children}
    </>
  )
}

export default Layout
