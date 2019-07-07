import color from "color";

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const randomChoice = (arr: any[]) => arr[Math.random() % arr.length];

const generateRandomUsername = () => {
  const possibleParts = [
    "sand",
    "queen",
    "robot",
    "black",
    "spider",
    "user",
    "green",
    "folk",
    "grasp",
    "zombie",
    "feather",
    "cat",
    "dog",
    "chicken",
    "trusty"
  ];

  const partsAmount = (Math.random() % 3) + 1;

  let result = "";

  for (let i = 0; i < partsAmount; i++) {
    result += randomChoice(possibleParts);
  }

  return result;
};

const generateRandomFirstname = () =>
  randomChoice(["John", "Sarah", "Roberto"]);

const generateRandomLastname = () =>
  randomChoice(["Archer", "Crocker", "Programmer"]);

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
    let hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      // Convert to 32bit integer
      hash |= 0;
    }
    return hash;
  };

  // Calculate the username hash
  const usernameHash = hash(username);

  const a = [0, 0, 0].map((_, index: number) => {
    let res = Math.abs((usernameHash ^ ((index * 2398237) & 8923498239)) % 255);
    res = res >= 190 ? 190 : res;
    return res;
  });
  return color.rgb(a[0], a[1], a[2]).string();
};

export const getCurrentTime = () => new Date().getTime();

export const scrollDownElement = (elem: any) => {
  elem.scrollTop = elem.scrollHeight;
};

export default {
  EMAIL_REGEX,
  isUpper,
  scrollDownElement,
  getUserAvatarBackgroundColor
};
