import React from 'react'

const ProfileImage = (props) => {

    return (
        <img src={props.imageUrl} className='profile-image' alt='Profile'></img>
    )
}

export default ProfileImage