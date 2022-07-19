import React from 'react'
import { Icon, Image } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import firebaseApp from '../../utils/Firebase';
import userImage from '../../assets/png/user.png';
import { getAuth, signOut } from 'firebase/auth';
import './TopBar.scss';

export const TopBar = ({ user }) => {

    const navigate = useNavigate();

    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth);

    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='top-bar'>
            <div className="top-bar__left">
                <Icon name='angle left' onClick={goBack} />
            </div>
            <div className="top-bar__right">
                <Link to='/settings'>
                    <Image src={ user.photoURL ? user.photoURL : userImage} />
                    { user.displayName }
                </Link>
                <Icon name='power off' onClick={logout} />
            </div>
        </div>
    )
}
