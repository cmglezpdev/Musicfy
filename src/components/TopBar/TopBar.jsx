import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Image } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import userImage from '../../assets/png/user.png';
import { LogoutInFirebase } from '../../actions/authActions';
import './TopBar.scss';

export const TopBar = () => {
    const { currentUser : user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch( LogoutInFirebase() );
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
