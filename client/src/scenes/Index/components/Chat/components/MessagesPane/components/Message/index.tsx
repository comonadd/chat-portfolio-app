/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
const Color = require('color');

const style = require('./style');

interface MessageLeftProps {
  author: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}

const MessageLeft = (props: MessageLeftProps) => {
  const doesAvatarExists = props.author.avatarUrl.length > 0;

  const generateRandomAvatarBackgroundColor = () => {
    const a = [0, 0, 0].map(() => {
      let res = Math.random() * 255 % 255
      res = res >= 190 ? 190 : res;
      return res;
    });
    return Color.rgb(a[0], a[1], a[2]).string();
  };

  const backgroundColor = generateRandomAvatarBackgroundColor();

  return (
    <div className={style.msg__left}>
      <div className={style.msg__left__authorAvatar}>
        {doesAvatarExists ? <img src={props.author.avatarUrl}/> :
         <div className={style.msg__left__authorAvatar__synteticImage}
              style={{background: backgroundColor, color: '#fff', }}>
           <span>
             {`${props.author.firstName[0]} ${props.author.lastName[0]}`}
           </span>
         </div>}
      </div>
    </div>
  );
};

interface MessageBodyHeaderProps {
  author: {
    username: string;
    firstName: string;
    lastName: string;
  };
}

const MessageBodyHeader = (props: MessageBodyHeaderProps) =>
  <div className={style.msg__body__header}>
    <div className={style.msg__body__header__author}>
      <div className={style.msg__body__header__author__fullname}>
        {props.author.firstName + ' ' + props.author.lastName}
      </div>
      <div className={style.msg__body__header__author__username}>
        (@{props.author.username})
      </div>
    </div>
  </div>;

interface MessageBodyProps {
  text: string;
  author: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    username: string;
  };
}

const MessageBody = (props: MessageBodyProps) =>
  <div className={style.msg__body}>
    <MessageBodyHeader author={props.author} />
    <div className={style.msg__body__text}>
      {props.text}
    </div>
  </div>;

export interface MessageProps {
  id: string,
  author: {
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string;
  };
  text: string;
}

export default (props: MessageProps) =>
  <div className={style.msg}>
    <MessageLeft author={props.author} />
    <MessageBody text={props.text} author={props.author} />
  </div>;
