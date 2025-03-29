import multer from 'multer'

export const storage = multer.memoryStorage();
 const singleUpload = multer({storage}).single("file");
 export default singleUpload ;