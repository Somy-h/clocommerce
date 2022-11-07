import './navigation.styles.scss';
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

export default function Navigation() {
  return (
    <Fragment>
      <nav>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          <Link className='nav-link' to='/auth'>SIGN-IN</Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  )
}