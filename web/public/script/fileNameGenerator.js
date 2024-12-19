const fs = require('fs');
const path = require('path');

export function generateFileName(file) {
    const folderPath = '../style/content/public_img'

    let fullPath = path.join(folderPath, file);
    let fileExtension = path.extname(file);

    let newFileName = randomisedName() + fileExtension;
    
    function randomisedName() {
        let length = 50;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    try {
      fs.renameSync(fullPath, path.join(folderPath, newFileName));
    } catch (error) {
      console.error(error);
    }
}