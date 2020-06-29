const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('port', process.env.PORT || 4000);

// Imports routes
const orderRoutes = require('./routes/order.route');
const carrierRoutes = require('./routes/carrier.router');
const shipmentRoutes = require('./routes/shipment.route');

// middleware
app.use(express.json());
app.use(morgan('dev'));


// Use routes
app.use('/api', orderRoutes);
app.use('/api', carrierRoutes);
app.use('/api', shipmentRoutes);

// Swagger documentation
require('./swagger-documentation/config-documentation')(app);

app.listen(app.get('port'));
console.log(`Server on port: ${app.get('port')}`);