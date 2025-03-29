import DataUriParser from "datauri/parser.js"
import path from "path"

const getDataUri = (file)=>{
    const parser = new  DataUriParser();
    const extName = path.extname(file?.originalname).toString();
    return parser.format(extName,file.buffer);
}
export default getDataUri;


// import DataUriParser from "datauri/parser.js";
// import path from "path";

// const getDataUri = (file) => {
//     try {
//         // 1. Validate file object
//         if (!file || typeof file !== 'object') {
//             throw new Error('Invalid file object');
//         }

//         // 2. Validate buffer exists
//         if (!file.buffer || !Buffer.isBuffer(file.buffer)) {
//             throw new Error('File buffer is missing or invalid');
//         }

//         // 3. Get extension with fallbacks
//         let extName;
//         if (file.originalname) {
//             extName = path.extname(file.originalname);
//         } else if (file.name) {
//             extName = path.extname(file.name);
//         } else {
//             // Fallback for files without name
//             extName = file.mimetype ? 
//                 `.${file.mimetype.split('/')[1]}` : 
//                 '.bin';
//         }

//         // 4. Create Data URI
//         const parser = new DataUriParser();
//         return parser.format(extName, file.buffer);

//     } catch (error) {
//         console.error('Error in getDataUri:', error);
//         throw new Error(`File processing failed: ${error.response.data.message}`);
//     }
// };

// export default getDataUri;