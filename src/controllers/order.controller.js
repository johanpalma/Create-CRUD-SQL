const pool = require('../../database/database');


const createOrder = async(req, res) => {
    const { provider, address, phone, description_order, quantity,
        unit_price, total_price, delivery_date, carrier_id } = req.body;


        try {
            const responseRegister = await pool.query('INSERT INTO orders ( provider, address, phone, description_order, quantity, unit_price, total_price, delivery_date, carrier_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
                provider, address, phone, description_order, quantity, unit_price, total_price, delivery_date, carrier_id
            ]);
            res.status(200).json({
                message: 'Order create successfully',
                data: responseRegister.rowCount
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error data no save'
            }) ;
        }
}

const getOrders = async(req, res) => {
    try {
        const response = await pool.query('SELECT * FROM orders ORDER BY id ASC');
        res.status(200).json({
            message: 'get order successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const getOrderById = async(req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        res.status(200).json({
            message: 'get order successfully',
            data: response.rows
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

const updateOrder = async(req, res) => {
    const { id } = req.params;
    const { provider, address, phone, description_order, quantity,
        unit_price, total_price, delivery_date, carrier_id } = req.body;
    try {
        const response = await pool.query('UPDATE orders SET provider = $1, address = $2, phone = $3, description_order = $4, quantity = $5, unit_price = $6, total_price = $7, delivery_date = $8, carrier_id = $9 WHERE id = $10', [
            provider, address, phone, description_order, quantity, unit_price, total_price, delivery_date, carrier_id, id
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

const deleteOrders = async(req, res) => {
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
    createOrder,
    getOrders,
    getOrderById,
    deleteOrders,
    updateOrder
}