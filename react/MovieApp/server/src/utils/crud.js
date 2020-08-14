export const getById = model => async (req, res) => {
  try {
    const doc = await model
      .find({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: doc })
  } catch (e) {
    res.status(400).end()
  }
}

export const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const create = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const update = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const remove = model => async (req, res) => {
  try {
    const removed = await model
    .findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const sortAll = model => async (req, res) => {
  try {
    let sortByTitle = { title: 1 }
    const sorted = await model
      .find({})
      .sort(sortByTitle)
      .lean()
      .exec()

    if (!sorted) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: sorted })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const searchByTitle = model => async (req, res) => {
  try {
    let query = {
      $or: [
        { title: { $regex: req.params.query } },
        { stars: { $regex: req.params.query } }
      ]
    }
    const search = await model
      .find(query)
      .lean()
      .exec()

    if (!search) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: search })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const uploadFile = model => async (req, res) =>{
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    try {
      let movies = await parse(req.files.Movie.data.toString().trim());
      
      const upload = await model
        .insertMany(movies)
      
      return res.status(200).json({ data: upload });
     
    } catch(error) {
      res.status(400).send(error.message);
    }

};

const parse = (file) => {
	return new Promise (((resolve) => {
		let moviesArray = [];
		let movies = file.replace(/(\r\n|\n|\r)/gm, '\n').split(/^\s*\n/gm);
		let pattern = /Title:\s*(.+?)\s*\nRelease Year:\s*(\d{4})\s*\nFormat:\s*(VHS|DVD|Blu-Ray)\s*\nStars:\s*(.*)/;

		movies.forEach((str) => {
			if (pattern.test(str)) {
				const result = pattern.exec(str);

				const movie = {
					title: result[1],
					year: parseInt(result[2], 10),
					format: result[3],
					stars: result[4].split(', ').map((name) => (name.trim()))
				};

				moviesArray.push(movie);
			} else {
				throw new Error('Invalid file');
			}
		});
		resolve(moviesArray);
	}));
};

export const crudControllers = model => ({
  create: create(model),
  remove: remove(model),
  update: update(model),
  getById: getById(model),
  getAll: getAll(model),
  sortAll: sortAll(model),
  searchByTitle: searchByTitle(model),
  uploadFile: uploadFile(model)
})
