export const getById = model => async (req, res) => {
  try {
    const doc = await model
      .find({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: doc })
  } catch (e) {
    res.status(400).end()
  }
};

export const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec();

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
};

export const create = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
};

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
      .exec();

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
};

export const remove = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id
    });

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
};

export const crudControllers = model => ({
  create: create(model),
  remove: remove(model),
  update: update(model),
  getById: getById(model),
  getAll: getAll(model),

});
