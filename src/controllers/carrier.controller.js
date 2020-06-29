const pool = require('../../database/database');

const createCarrier = async(req, res) => {
    const { name, scac, mc, dot, fein } = req.body;

        try {
            const responseRegister = await pool.query('INSERT INTO carriers ( name, scac, mc, dot, fein ) VALUES ($1, $2, $3, $4, $5)', [
                name, scac, mc, dot, fein
            ]);
            res.status(200).json({
                message: 'Carrier create successfully',
                data: responseRegister.rowCount
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error data no save'
            }) ;
        }
}

const getCarries = async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM carriers ORDER BY id ASC');
        res.status(200).json({
            message: 'get carriers successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const getCarrieById = async(req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('SELECT * FROM carriers WHERE id = $1', [id]);
        res.status(200).json({
            message: 'get carriers successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const updateCarrier= async(req, res) => {
    const { id } = req.params;
    const { name, scac, mc, dot, fein } = req.body;

    try {
        const response = await pool.query('UPDATE carriers SET name = $1, scac = $2, mc = $3, dot = $4, fein = $5 WHERE id = $6', [
            name, scac, mc, dot, fein, id
        ]);
        res.status(200).json({
            message: `Update carrier ${id} successfully`,
            data: response.rowCount
        });
    } catch (error) {
        res.status(500).json({
            Error: error,
            message: 'Error data no update'
        }) ;
    }
}

const deleteCarrier = async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM carriers WHERE id = $1', [
            id
        ]);
        res.status(200).json(`Carriers ${id} delete successfully`);
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        }); 
    }
}

module.exports = {
    createCarrier,
    getCarries,
    getCarrieById,
    updateCarrier,
    deleteCarrier,
}