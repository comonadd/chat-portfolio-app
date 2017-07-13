/* File: manager.js */
/* Creation date: 2017-06-04 */
/* Creator: Dmitry Guzeev <dmitry.guzeev@yahoo.com> */
/* Description: */
/*   Utility */

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

/**
 * @summary
 * List directory recursively with a given predicate
 *
 * @description
 * This function lists all files in a given directory,
 * and filters the paths using given predicate function.
 * <br/>
 * This function can also accept file path as a first argument
 *
 * @param {string} _path - File/Directory path
 * @param {Function} pred - Predicate to apply for each path
 *
 * @return {string[]} - the list of file paths
 */
module.exports.listDirRecWithPred = (rootPath, pred) => {
  /* Allocate new object */
  const filePaths = [];

  /* The recursive function that is used for iteration */
  const considerDir = (filePath) => {
    /* If given path is a directory */
    if (fs.lstatSync(filePath).isDirectory()) {
      /* Read all files in a directory, and iterate on them */
      /* recursivly calling considerDir() */
      const paths = fs.readdirSync(filePath);
      paths.forEach((_filePath, ..._) =>
        considerDir(path.resolve(filePath, _filePath)));
    } else if (pred(filePath) && fs.existsSync(filePath)) {
      /* Append file path to the list of paths */
      filePaths.push(filePath);
    }
  };

  /* Start iterating over the given path */
  considerDir(rootPath);

  /* Succeed */
  return filePaths;
};

/**
* @summary
 * Recursively copy files from one directory in another with predicate
 *
 * @param {string} fromDirPath - Source directory
 * @param {string} intoDirPath - Destination directory
 * @param {Function} pred - Destination directory
 *
 * @return {undefined}
 */
module.exports.copyFilesFromIntoWithPred = (fromDirPath, intoDirPath, pred) => {
  /* Function that maps the given file from   */
  /* source directory to the output directory */
  const mapPath = p =>
    path.resolve(intoDirPath, path.relative(fromDirPath, p));

  /* Function that processes given directory */
  const processDir = (dirPath) => {
    fs.readdir(dirPath, (err, dirEntries) => {
      if (!err) {
        /* There is no error */
        dirEntries.forEach((entryPath, ..._) => {
          const fullEntryPath = path.resolve(dirPath, entryPath);
          if (fs.lstatSync(fullEntryPath).isDirectory()) {
            fs.mkdir(mapPath(fullEntryPath));
            processDir(fullEntryPath);
          } else if (pred(entryPath)) {
            fse.copy(fullEntryPath, mapPath(fullEntryPath));
          }
        });
      } else {
        /* Error */
        throw new Error(`failed to read directory at "${dirPath}"`);
      }
    });
  };

  /* Process the given directory */
  processDir(fromDirPath);
};

/**
 * @summary
 * Recursively apply given function for each
 * of the paths in the given directory with
 * a given predicate.
 *
 * @param {string} rootDirPath - The path of the root directory to start with.
 * @param {Function} pred - The predicate.
 * @param {Function} f - Function to apply.
 *
 * @return {undefined}
 */
module.exports.forEachFilePathWithPred = (rootDirPath, pred, f) => {
  const processPath = (filePath) => {
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.readdir(filePath, (err, dirEntries) => {
        dirEntries.forEach((entryPath) => {
          processPath(path.resolve(filePath, entryPath));
        });
      });
    } else if (pred(filePath)) {
      f(filePath);
    }
  };

  /* Process the given path recursively */
  processPath(rootDirPath);
};
