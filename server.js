// // server.js
// const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
//
// // Load environment variables
// dotenv.config();
//
// // Initialize Express
// const app = express();
//
// // Middleware
// app.use(bodyParser.json());
//
// // MongoDB connection
// const uri = process.env.MONGODB_URI || "mongodb+srv://Cluster33787:Cluster33787@cluster33787.qgfsblc.mongodb.net/SnackersDB?retryWrites=true&w=majority&appName=Cluster33787";
//
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
//
// async function connectDB() {
//     try {
//         console.log('Attempting to connect to MongoDB...');
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1); // Exit process with failure
//     }
// }
//
// connectDB().then(() => {
//     // Import routes
//     const productsRouter = require('./routes/products')(client);
//
//     // Use routes
//     app.use('/api/products', productsRouter);
//
//     // Error handling middleware
//     app.use((err, req, res, next) => {
//         console.error('Unhandled error:', err.stack);
//         res.status(500).send('Something broke!');
//     });
//
//     // Server listening
//     const PORT = process.env.PORT || 5001; // Changed port to 5001
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(console.dir);
//
// module.exports = app;


// server.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://Cluster33787:Cluster33787@cluster33787.qgfsblc.mongodb.net/SnackersDB?retryWrites=true&w=majority&appName=Cluster33787";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: false,
    }
});

async function connectDB() {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
}

connectDB().then(() => {
    // Import routes
    const productsRouter = require('./routes/products')(client);

    // Use routes
    app.use('/api/products', productsRouter);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err.stack);
        res.status(500).send('Something broke!');
    });

    // Server listening
    const PORT = process.env.PORT || 5001; // Changed port to 5001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(console.dir);

module.exports = app;

// const express = require('express');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS

// // MongoDB connection
// const uri = process.env.MONGODB_URI || "mongodb+srv://Cluster33787:Cluster33787@cluster33787.qgfsblc.mongodb.net/SnackersDB?retryWrites=true&w=majority&appName=Cluster33787";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: false,
//         deprecationErrors: false,
//     }
// });

// async function connectDB() {
//     try {
//         console.log('Attempting to connect to MongoDB...');
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//         process.exit(1); // Exit process with failure
//     }
// }

// connectDB().then(() => {
//     // Import routes
//     const productsRouter = require('./routes/products')(app, client);

//     // Use routes
//     app.use('/api/products', productsRouter);

//     // Error handling middleware
//     app.use((err, req, res, next) => {
//         console.error('Unhandled error:', err.stack);
//         res.status(500).send('Something broke!');
//     });

//     // Server listening
//     const PORT = process.env.PORT || 5001; // Changed port to 5001
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(console.dir);

// module.exports = app;