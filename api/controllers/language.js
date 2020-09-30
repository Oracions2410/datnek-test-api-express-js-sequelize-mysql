const { language } = require('../../models')
const { LANGUAGE_ROUTES_ROOT_PATH, API_ROOT_PATH } = require('../constants/url_paths')
const log = require('../helpers/debug')

/**
 * Store a new language
 * @param {*} req 
 * @param {*} res 
 */
function create(req, res) {
    try {
        const { name, speak, write, listen, notation } = req.body
        if (!(name && speak && write && listen, notation)) {
            return res.status(400).json({ error: 'Requête invalide, tous les champs doivent être renseignés. (name, speak, write, listen, notation)' })
        }

        language.create({ name, speak, write, listen, notation })
            .then(newLang => {

                return res.status(201).json({
                    newLang: newLang,
                    href: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}/`
                    }
                })

            })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de créer la langue: ', err })
    }
}


/**
 * Fetch all languages from database
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
function findAll(req, res) {
    try {
        language.findAll()
            .then(languages => {

                return res.status(200).json({
                    count: languages.length,
                    languages: languages.map(lang => {
                        return {
                            id: lang.id,
                            name: lang.name,
                            notation: lang.notation,
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
            })


    } catch (err) {
        res.status(500).json({ error: 'Impossible de charger les langues: ' + err })
    }
}




/**
 * Fetch specific language from database
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
function findById(req, res) {
    const { languageId } = req.params
    //log('id', id)
    try {
        language.findByPk(languageId)
            .then(lang => {

                if (lang === null) {
                    return res.status(404).json({ error: 'Le language d\'identifiant ' + languageId + ' est introuvable' })
                }

                res.status(200).json({
                    id: lang.id,
                    name: lang.name,
                    notation: lang.notation,
                    speak: lang.speak,
                    write: lang.write,
                    listen: lang.listen,
                    createdAt: lang.createdAt,
                    updatedAt: lang.updatedAt,
                    href: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}`
                    }
                })
            })


    } catch (err) {
        res.status(500).json({ error: 'Impossible de charger la langue d\'identifiant: ' + languageId })
    }

}




/**
 * Met à jours tous les attributs d'une langue
 * @param {*} req 
 * @param {*} res 
 */
function updateAll(req, res) {
    const { languageId } = req.params
    try {

        const { name, speak, write, listen, notation } = req.body
        if (!(name && speak && write && listen, notation)) {
            return res.status(400).json({ error: 'Mauvaise requête, vous devez reseigner tous les champs. (name, speak, write, listen, notation)' })
        }

        language.update({ name, speak, write, listen, notation }, {
            where: { id: languageId }
        }).then(response => {
            if (response == 1) {
                res.status(200).json({
                    message: 'La langue a bien été mise à jour',
                    href: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}/${languageId}`
                    }
                })
            } else {
                res.status(500).json({ error: 'Impossible de mettre la langue à jours' })
            }
        })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de mettre à jour la langue d\'identifiant: ' + languageId })
    }
}



/**
 * Update specific fields
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
    const { languageId } = req.params

    try {
        const { name, speak, write, listen, notation } = req.body
        if (!(name || speak || write || listen, notation)) {
            return res.status(400).json({ erreur: 'mauvaise requête, vous devez fournir au moins un des champs. (name, speak, write, listen)' })
        }

        const toUpdate = { updatedAt: Date.now() }
        const inputKeys = Object.keys(req.body)

        if (inputKeys.includes('name')) toUpdate.name = name
        if (inputKeys.includes('speak')) toUpdate.speak = speak
        if (inputKeys.includes('write')) toUpdate.write = write
        if (inputKeys.includes('listen')) toUpdate.listen = listen
        if (inputKeys.includes('notation')) toUpdate.notation = notation

        language.update(toUpdate, {
            where: { id: languageId }
        }).then(response => {
            if (response == 1) {
                res.status(200).json({
                    message: 'La langue a bien été mise à jour',
                    href: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}/${languageId}`
                    }
                })
            } else {
                res.status(500).json({ error: 'Impossible de mettre la langue à jours' })
            }
        })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de mettre à jour la langue d\'identifiant: ' + languageId })
    }
}




function remove(req, res) {
    const { languageId } = req.params
    try {

        language.destroy({
            where: { id: languageId }
        }).then(response => {
            if (response === 1) {
                res.status(200).json({
                    message: 'La langue a belle et bien été supprimé',
                    href: {
                        type: 'POST',
                        body: {
                            name: 'String',
                            notation: 'String',
                            speak: 'Integer',
                            write: 'Integer',
                            listen: 'Integer'
                        },
                        url: `${req.protocol}://${req.get('host')}${API_ROOT_PATH}${LANGUAGE_ROUTES_ROOT_PATH}`
                    }
                })
            } else {
                res.status(500).json({ error: 'Impossible de supprimer la langue d\'identifiant: ' })
            }
        })

    } catch (err) {
        res.status(500).json({ error: 'Impossible de supprimer la langue d\'identifiant: ' + languageId })
    }
}


module.exports = {
    create,
    findAll,
    findById,
    updateAll,
    update,
    remove
}