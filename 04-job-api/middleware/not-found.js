const notFound = (res, req) => res.status(404).send("Routes does not exist")

module.exports = notFound