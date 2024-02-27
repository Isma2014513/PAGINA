const Comics = require("../models/Comics");

exports.getComics = async (req, res) => {
  try {
    console.log("Se ejecutó getComics");

    const page = parseInt(req.query.page) || 1; // Obtener el número de página desde la consulta o predeterminado a la página 1
    const limit = 10; // Definir el límite de elementos por página

    const skip = (page - 1) * limit; // Calcular la cantidad de elementos a omitir según la página actual

    const comics = await Comics.find().skip(skip).limit(limit); // Obtener los cómics para la página actual

    if (!comics || comics.length === 0) {
      return res.status(404).send("No se encontraron cómics");
    }

    res.status(200).send(comics);
  } catch (err) {
    console.error("Error en getComics: ", err);
    res.status(500).send("Error en el servidor");
  }
};

exports.getComicsById = async (req, res) => {
  try {
    const ComicsId = req.params.id; // Obtener el ID del mensaje de los parámetros de la solicitud

    console.log(`Se ejecutó getComicsById para el ID: ${ComicsId}`);

    const ComicEncontrado = await Comics.findById(ComicsId); 

    if (!ComicEncontrado) {
      return res.status(404).send("Comic no encontrado"); 
    }

    res.send(ComicEncontrado); 
  } catch (err) {
    console.error("Error en getComicsById: ", err);
    res.status(500).send("Error en el servidor");
  }
};

exports.createComics = async (req, res) => {
  try {
    console.log("Se ejecuto createComics");
    const Comic = new Comics({
      Titulo: req.body.Titulo,
      Estado: req.body.Estado,
      Tipo: req.body.Tipo,
      Resumen: req.body.Resumen,
      Capitulos: req.body.Capitulos
    });
    if (!Comic.Titulo || !Comic.Estado|| !Comic.Tipo|| !Comic.Resumen|| !Comic.Capitulos) {
      return res.status(404).send("campo o campos vacios");
    }
    const ComicGuardado = await Comic.save();

    console.log("Se ejecuto Comic.save");
    res.status(200).send(ComicGuardado);
  } catch (err) {
    console.error("Error en createComics: ", err);
    res.status(500).send("Error en el sevidor");
  }
};

exports.updateComics = async (req, res) => {
  console.log("updateComics");
  try {
    const { id } = req.params;
    const UpdateComic = {
      Titulo: req.body.Titulo,
      Estado: req.body.Estado,
      Tipo: req.body.Tipo,
      Resumen: req.body.Resumen,
      Capitulos: req.body.Capitulos,
    };
    if (!UpdateComic.Titulo || !UpdateComic.Estado|| !UpdateComic.Tipo|| !UpdateComic.Resumen || !UpdateComic.Capitulos) 
     {
      return res.status(404).send("campo o campos vacios");
    }
    const updatedComic = await Comics.findByIdAndUpdate(id,UpdateComic);
    if (updatedComic) {
      res.status(200).send(updatedComic);
    } else {
        return res.status(400).send("No se encontro un Comic en el Id ingresado");
    }
  } catch (err) {
    console.error("Error en updateComic: ", err);
    res.status(500).send("Error en el sevidor");
  }
};

exports.deleteComic = async (req, res) => {
  console.log("deleteComic");
  try {
    const { id } = req.params;

    const deletedComic = await Comics.findByIdAndDelete(id);
    if (deletedComic) {
      res.status(200).send(deletedComic);
    } else {
      return res.status(400).send("No se encontro un Comic en el Id ingresado");
    }
  } catch (err) {
    console.error("Error en deleteComic: ", err);
    res.status(500).send("Error en el sevidor");
  }
};
