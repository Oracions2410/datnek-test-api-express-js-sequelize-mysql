//importer la db
//importer le model

function create(req, res) {
    return res.json('Création d\'un nouveau language')
}

function findAll(req, res) {
    return res.json('Listing de tous les langues')
}

function findById(req, res) {
    return res.json('Listing d\'une Langue')
}

function updateAll(req, res) {
    return res.json('Mise à jour de tous les attributs d\'une langue')
}

function update(req, res) {
    return res.json('Listing de quelques attributs d\'une langue')
}

function remove(req, res) {
    return res.json('Suppression d\'une langue')
}

module.exports = {
    create,
    findAll,
    findById,
    updateAll,
    update,
    remove
}