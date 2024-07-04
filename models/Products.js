const { ObjectId } = require('mongodb');

class Products {
    constructor(db) {
        this.collection = db.collection('products');
        this.countersCollection = db.collection('counters');
    }

    async getNextSequenceValue(sequenceName) {
        const sequenceDocument = await this.countersCollection.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { returnOriginal: false, upsert: true }
        );
        return sequenceDocument.value.sequence_value;
    }

    async getAllProducts() {
        return await this.collection.find().toArray();
    }
    async getAllContacts() {
        return await this.collection.find().toArray();
    }

    async getProductById(id) {
        return await this.collection.findOne({ _id: id });
    }

    async createProduct(product) {
        const nextId = await this.getNextSequenceValue('productid');
        product._id = nextId;
        const result = await this.collection.insertOne(product);
        return result.ops[0];
    }

    async updateProduct(id, product) {
        await this.collection.updateOne({ _id: id }, { $set: product });
        return await this.getProductById(id);
    }

    async deleteProduct(id) {
        return await this.collection.deleteOne({ _id: id });
    }
}

module.exports = Products;
