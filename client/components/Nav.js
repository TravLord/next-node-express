import Link from 'next/link'


export default function Nav() {
  return (
    <div>
         <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/">
                <a className="nav-link text-dark navbar-text">Home</a>
                </Link>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link text-dark navbar-text" >Login</a>
                </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link text-dark navbar-text">Register</a>
                </Link>
            </li>
        </ul>
    </div>
  )
}
