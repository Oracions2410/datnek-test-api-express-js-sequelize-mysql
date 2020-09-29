const Language = require('../../models/language')
const log = require('../helpers/debug')

log('Model', Language)

function create(req, res) {

    return res.json('Création d\'un nouveau language')
}

async function findAll(req, res) {
    try {
        const data = await Language.findAll({ attributes: ['id', 'write'] })
        log('GEL language', data)
        return res.status(200).json({ languages: data })

    } catch (err) {
        res.status(500).json({ error: err })
    }
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