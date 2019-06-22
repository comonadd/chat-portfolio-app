/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

import util from 'src/util';
const style = require('./style');

type UserAvatarProps = {
  user: {
    username: string,
    firstname: string,
    lastname: string,
  },
  displayFullName: boolean;
};

export default (props: UserAvatarProps) => {
  // Generate the user's avatar background color
  const backgroundColor = util.getUserAvatarBackgroundColor(
    props.user.username,
  );

  return (
    <div className={style.userAvatar}
         style={{background: backgroundColor, color: '#fff', }}>
      {props.displayFullName ?
       <span className={style.userAvatar__fullname}>
         {`${props.user.firstname} ${props.user.lastname}`}
       </span> :
       <span className={style.userAvatar__nameInitials}>
         {`${props.user.firstname[0]} ${props.user.lastname[0]}`}
       </span>}
    </div>
  );
}
