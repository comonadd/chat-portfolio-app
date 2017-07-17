/**
 * @file index.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const Color = require('color');

const randomChoice = (arr: any[]) => arr[Math.random() % arr.length];

const generate_random_username = () => {
  const possibleParts = [
    'sand', 'queen', 'robot', 'black',
    'spider', 'user', 'green', 'folk',
    'grasp', 'zombie', 'feather', 'cat',
    'dog', 'chicken', 'trusty',
  ];

  const partsAmount = (Math.random() % 3) + 1;

  let result = '';

  for (let i = 0; i < partsAmount; i++) {
    result += randomChoice(possibleParts);
  }

  return result;
};

const generate_random_firstname = () => randomChoice([
  "John", "Sarah", "Roberto",
]);

const generate_random_lastname = () => randomChoice([
  "Archer", "Crocker", "Programmer",
]);

/**
 * @summary
 * Check if the letter is within the upper case.
 *
 * @description
 * This function will return `true` if the given letter is
 * within the upper case, and `false` otherwise.
 *
 * @return {boolean}
 */
export const isUpper = (ch: string) => ch.toUpperCase() == ch;

export const getUserAvatarBackgroundColor = (username: string) => {
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
    let res = (hash(username)) * 255 % 255
    res = res >= 190 ? 190 : res;
    return res;
  });
  return Color.rgb(a[0], a[1], a[2]).string();
};

export default {
  isUpper,
  getUserAvatarBackgroundColor,
};
