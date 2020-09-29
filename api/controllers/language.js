const { language } = require('../../models')
const { LANGUAGE_ROUTES_ROOT_PATH, API_ROOT_PATH } = require('../constants/url_paths')

const log = require('../helpers/debug')

function create(req, res) {
    try {


    } catch (err) {
        res.status(500).json({ error: 'Impossible de créer la langue: ', err })
    }
}


/**
 * Fetch all languages from database
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
async function findAll(req, res) {
    try {
        const languages = await language.findAll()

        return res.status(200).json({
            count: languages.length,
            languages: languages.map(lang => {
                return {
                    id: lang.id,
                    name: lang.name,
                    speak: lang.speak,
                    write: lang.write,
                    listen: lang.listen,
                    createdAt: lang.createdAt,
                    updatedAt: lang.updatedAt,
                    href: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}/${lang.id}`
                    }
                }
            })
        })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de charger les langues: ' + err })
    }
}



async function findById(req, res) {
    const id = req.params.languageId
    try {
        const lang = await language.findByPk(id)
        log('show lang', lang)
        res.status(200).json({
            id: lang.id,
            speak: lang.speak,
            write: lang.write,
            listen: lang.listen,
            href: {
                type: 'GET',
                url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}`
            }
        })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de charger la langue d\'identifiant: ' + id })
    }

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