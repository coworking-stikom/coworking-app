import { signIn, signOut, useSession } from 'next-auth/client'
import { useRef, useState } from 'react'
import Modals from './modal'

const NavbarApp = () => {
  const [session, loading] = useSession()
  const modalRef = useRef()
  const [json, setJson] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  async function signInWithCredentials() {
    const response = await signIn('credentials', {
      ...{ redirect: false },
      ...json
    })

    if (response.error != null) {
      setError(response.error)
      setTimeout(() => {
        setError('')
      }, 4000)
    } else {
      modalRef.current.close()
      setJson({ ...json, ...{ email: '', password: '' } })
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Coworking-Space
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
            </ul>
            {!session ? (
              <div className="d-flex ms-4">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => modalRef.current.open()}
                >
                  Sign In
                </button>
                <button className="btn btn-primary ms-2" type="button">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="d-flex ms-4">
                {'user' in session && (
                  <img
                    src={session.user.image}
                    className="rounded-circle"
                    width="30"
                  />
                )}
                <button
                  className="btn btn-danger btn-sm ms-2"
                  type="button"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Modals ref={modalRef} size="md">
        <div className="p-2">
          <div className="pt-4 pb-2 px-2">
            <h5 className="text-center">Sign In</h5>
            {error != '' && (
              <h6 className="text-danger text-center">
                <small>{error}</small>
              </h6>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                value={json.email}
                placeholder="Enter Your Email"
                onChange={(e) =>
                  setJson({ ...json, ...{ email: e.target.value } })
                }
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter Your Password"
                value={json.password}
                onChange={(e) =>
                  setJson({ ...json, ...{ password: e.target.value } })
                }
              />
            </div>
            <div className="pt-3">
              <button
                className="btn btn-outline-primary w-100"
                type="button"
                onClick={signInWithCredentials}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="px-2 pb-3">
            <div
              style={{
                display: 'flex',
                WebkitBoxAlign: 'center',
                alignItems: 'center',
                margin: '24px 0'
              }}
            >
              <span
                style={{
                  border: '0.5px solid rgba(0, 0, 0, 0.12)',
                  width: '50%'
                }}
              />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  color: 'rgba(0, 0, 0, 0.38)',
                  padding: '0 18px'
                }}
              >
                Or
              </span>
              <span
                style={{
                  border: '0.5px solid rgba(0, 0, 0, 0.12)',
                  width: '50%'
                }}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={() =>
                signIn('google', { callbackUrl: 'http://localhost:5000' })
              }
            >
              Sign In With Google
            </button>
          </div>
        </div>
      </Modals>
    </>
  )
}

export default NavbarApp
