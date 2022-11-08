import './navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser} from '../../components/utils/firebase/firebase.utils'

export default function Navigation() {

  const {currentUser, setCurrentUser} = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <Fragment>
      <nav>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          { 
            currentUser ? 
            <span className='nav-link' onClick={handleSignOut}>SIGN OUT</span>
            : <Link className='nav-link' to='/auth'>SIGN-IN</Link>
          }
        </div>
      </nav>
      <Outlet />
    </Fragment>
  )
}