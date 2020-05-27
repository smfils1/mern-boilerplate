const paginate = (model, auth = false) => async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const count = await model.countDocuments();
  const maxPages = Math.ceil(count / limit) || 1;

  const results = { maxPages };

  if (endIndex < count) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    const filter = auth ? { user: req.userId } : {};
    results.results = await model.find(filter).limit(limit).skip(startIndex);
    res.paginatedResults = results;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = paginate;
