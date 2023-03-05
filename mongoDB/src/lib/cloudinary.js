const {v2} = require("cloudinary")
require('dotenv').config()
v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const uploadImage = async (filePath, public_id) => {
  return await v2.uploader.upload(filePath, {
    folder: "tienda",
    overwrite: true,
  });
};

const deleteImage = async id => {
    return await v2.uploader.destroy(id)
}

const updateImage = async (filePath, public_id) => {
  // Carga la nueva imagen
  const result = await uploadImage(filePath, public_id);

  // Borra la imagen anterior
  await deleteImage(public_id);

  // Retorna el resultado de la carga de la nueva imagen
  return result;
};
module.exports = {uploadImage, deleteImage, updateImage}