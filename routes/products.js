// const express = require('express');
// const router = express.Router();
// const Products = require('../models/Products');

// module.exports = (client) => {
//     const db = client.db("SnackersDB");
//     const productsModel = new Products(db);

//     // Get all products
//     router.get('/', async (req, res) => {
//         try {
//             const products = await productsModel.getAllProducts();
//             res.json(products);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     });
//     //get all contacts
//     app.get('/api/contacts', async (req, res) => {
//         try {
//             const contacts = await Contact.find();
//             res.json(contacts);
//         } catch (err) {
//             res.status(500).send('Server error');
//         }
//     });
//     // Get a single product
//     router.get('/:id', async (req, res) => {
//         try {
//             const productId = parseInt(req.params.id, 10);
//             if (isNaN(productId)) {
//                 return res.status(400).json({ message: 'Invalid product ID format' });
//             }
//             const product = await productsModel.getProductById(productId);
//             if (!product) {
//                 return res.status(404).json({ message: 'Cannot find product' });
//             }
//             res.json(product);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     });

//     // Create a product
//     router.post('/', async (req, res) => {
//         const product = {
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             imageUrl: req.body.imageUrl
//         };

//         try {
//             const newProduct = await productsModel.createProduct(product);
//             res.status(201).json(newProduct);
//         } catch (err) {
//             res.status(400).json({ message: err.message });
//         }
//     });

//     // Update a product
//     router.patch('/:id', async (req, res) => {
//         const productId = parseInt(req.params.id, 10);
//         if (isNaN(productId)) {
//             return res.status(400).json({ message: 'Invalid product ID format' });
//         }

//         const updates = {};
//         if (req.body.name != null) updates.name = req.body.name;
//         if (req.body.description != null) updates.description = req.body.description;
//         if (req.body.price != null) updates.price = req.body.price;
//         if (req.body.imageUrl != null) updates.imageUrl = req.body.imageUrl;

//         try {
//             const updatedProduct = await productsModel.updateProduct(productId, updates);
//             res.json(updatedProduct);
//         } catch (err) {
//             res.status(400).json({ message: err.message });
//         }
//     });

//     // Delete a product
//     router.delete('/:id', async (req, res) => {
//         const productId = parseInt(req.params.id, 10);
//         if (isNaN(productId)) {
//             return res.status(400).json({ message: 'Invalid product ID format' });
//         }

//         try {
//             const result = await productsModel.deleteProduct(productId);
//             if (result.deletedCount === 0) {
//                 return res.status(404).json({ message: 'Cannot find product' });
//             }
//             res.json({ message: 'Deleted Product' });
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     });
// // // Create a contact
// //     router.post('/contacts', async (req, res) => {
// //         const contact = {
// //             name: req.body.name,
// //             email: req.body.email,
// //             message: req.body.message
// //         };
// //
// //         try {
// //             const newContact = await contactsModel.createContact(contact);
// //             res.status(201).json(newContact);
// //         } catch (err) {
// //             res.status(400).json({ message: err.message });
// //         }
// //     });
// //     Update a contact
//     // router.patch('/contacts/:id', async (req, res) => {
//     //     const contactId = parseInt(req.params.id, 10);
//     //     if (isNaN(contactId)) {
//     //         return res.status(400).json({ message: 'Invalid contact ID format' });
//     //     }
//     //
//     //     const updates = {};
//     //     if (req.body.name != null) updates.name = req.body.name;
//     //     if (req.body.email != null) updates.email = req.body.email;
//     //     if (req.body.message != null) updates.message = req.body.message;
//     //
//     //     try {
//     //         const updatedContact = await contactsModel.updateContact(contactId, updates);
//     //         res.json(updatedContact);
//     //     } catch (err) {
//     //         res.status(400).json({ message: err.message });
//     //     }
//     // });

//     // // Delete a contact
//     // router.delete('/contacts/:id', async (req, res) => {
//     //     const contactId = parseInt(req.params.id, 10);
//     //     if (isNaN(contactId)) {
//     //         return res.status(400).json({ message: 'Invalid contact ID format' });
//     //     }
//     //
//     //     try {
//     //         const result = await contactsModel.deleteContact(contactId);
//     //         if (result.deletedCount === 0) {
//     //             return res.status(404).json({ message: 'Cannot find contact' });
//     //         }
//     //         res.json({ message: 'Deleted Contact' });
//     //     } catch (err) {
//     //         res.status(500).json({ message: err.message });
//     //     }
//     // });
//     return router;
// };

const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

module.exports = (client) => {
    const db = client.db("SnackersDB");
    const productsModel = new Products(db);

    // Get all products
    router.get('/', async (req, res) => {
        try {
            const products = await productsModel.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Get a single product
    router.get('/:id', async (req, res) => {
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                return res.status(400).json({ message: 'Invalid product ID format' });
            }
            const product = await productsModel.getProductById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Cannot find product' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Create a product
    router.post('/', async (req, res) => {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl
        };

        try {
            const newProduct = await productsModel.createProduct(product);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Update a product
    router.patch('/:id', async (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const updates = {};
        if (req.body.name != null) updates.name = req.body.name;
        if (req.body.description != null) updates.description = req.body.description;
        if (req.body.price != null) updates.price = req.body.price;
        if (req.body.imageUrl != null) updates.imageUrl = req.body.imageUrl;

        try {
            const updatedProduct = await productsModel.updateProduct(productId, updates);
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Delete a product
    router.delete('/:id', async (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        try {
            const result = await productsModel.deleteProduct(productId);
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Cannot find product' });
            }
            res.json({ message: 'Deleted Product' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};