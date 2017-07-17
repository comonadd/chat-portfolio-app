/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
const Color = require('color');

const style = require('./style');

interface MessageLeftProps {
  author: {
    firstname: string;
    lastname: string;
  };
}

const MessageLeft = (props: MessageLeftProps) => {
  const doesAvatarExists = false;

  const getUserAvatarBackgroundColor = (firstname: string, lastname: string) => {
    const hash = (str: string) => {
      let hash = 0, i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        // Convert to 32bit integer
        hash |= 0;
      }
      return hash;
    };

    const a = [0, 0, 0].map(() => {
      let res = (hash(props.author.firstname) ^ hash(props.author.lastname)) * 255 % 255
      res = res >= 190 ? 190 : res;
      return res;
    });
    return Color.rgb(a[0], a[1], a[2]).string();
  };

  // Generate the user's avatar background color
  const backgroundColor = getUserAvatarBackgroundColor(
    props.author.firstname,
    props.author.lastname,
  );

  return (
    <div className={style.msg__left}>
      <div className={style.msg__left__authorAvatar}>
        {doesAvatarExists ? <img src={''}/> :
         <div className={style.msg__left__authorAvatar__synteticImage}
              style={{background: backgroundColor, color: '#fff', }}>
           <span>
             {`${props.author.firstname[0]} ${props.author.lastname[0]}`}
           </span>
         </div>}
      </div>
    </div>
  );
};

interface MessageBodyHeaderProps {
  author: {
    username: string;
    firstname: string;
    lastname: string;
  };
}

const MessageBodyHeader = (props: MessageBodyHeaderProps) =>
  <div className={style.msg__body__header}>
    <div className={style.msg__body__header__author}>
      <div className={style.msg__body__header__author__fullname}>
        {props.author.firstname + ' ' + props.author.lastname}
      </div>
      <div className={style.msg__body__header__author__username}>
        (@{props.author.username})
      </div>
    </div>
  </div>;

interface MessageBodyProps {
  text: string;
  author: {
    firstname: string;
    lastname: string;
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
    firstname: string;
    lastname: string;
    username: string;
  };
  text: string;
}

export default (props: MessageProps) =>
  <div className={style.msg}>
    <MessageLeft author={props.author} />
    <MessageBody text={props.text} author={props.author} />
  </div>;
