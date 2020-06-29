const pool = require('../../database/database');

const createShipments = async(req, res) => {
    const { carrier_id, origin_country, origin_state, origin_city,
        destination_country, destination_state, destination_city,
        pickup_date, delivery_date, status, carrier_rate } = req.body;


        try {
            const responseRegister = await pool.query('INSERT INTO shipments ( carrier_id, origin_country, origin_state, origin_city, destination_country, destination_state, destination_city, pickup_date, delivery_date, status, carrier_rate ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                carrier_id, origin_country, origin_state, origin_city, destination_country, 
                destination_state, destination_city, pickup_date, delivery_date, status, carrier_rate
            ]);
            res.status(200).json({
                message: 'Shipments create successfully',
                data: responseRegister.rowCount
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error data no save'
            }) ;
        }
}

const getShipments = async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM shipments ORDER BY id ASC');
        res.status(200).json({
            message: 'get shipments successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const getShipmentById = async(req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('SELECT * FROM shipments WHERE id = $1', [id]);
        res.status(200).json({
            message: 'get shipments successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const updateShipment = async(req, res) => {
    const { id } = req.params;
    const { carrier_id, origin_country, origin_state, origin_city, destination_country, 
            destination_state, destination_city, pickup_date, delivery_date, status, carrier_rate } = req.body;

    try {
        const response = await pool.query('UPDATE shipments SET carrier_id = $1, origin_country = $2, origin_state = $3, origin_city = $4, destination_country = $5, destination_state = $6, destination_city = $7, pickup_date = $8, delivery_date = $9, status = $10, carrier_rate = $11 WHERE id = $12', [
            carrier_id, origin_country, origin_state, origin_city, destination_country, 
            destination_state, destination_city, pickup_date, delivery_date, status, carrier_rate, id
        ]);
        res.status(200).json({
            message: `Update orders ${id} successfully`,
            data: response.rowCount
        });
    } catch (error) {
        res.status(500).json({
            Error: error,
            message: 'Error data no update'
        }) ;
    }
}

const deleteShipment = async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM orders WHERE id = $1', [
            id
        ]);
        res.status(200).json(`Order ${id} delete successfully`);
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        }); 
    }
}

module.exports = {
    createShipments,
    getShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
}