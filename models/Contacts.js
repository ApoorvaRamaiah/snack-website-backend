const { ObjectId } = require('mongodb');

class Contacts {
    constructor(db) {
        this.collection = db.collection('contacts');
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

    async getAllContacts() {
        return await this.collection.find().toArray();
    }

    async getContactById(id) {
        return await this.collection.findOne({ _id: id });
    }

    async createContact(contact) {
        const nextId = await this.getNextSequenceValue('contactid');
        contact._id = nextId;
        const result = await this.collection.insertOne(contact);
        return result.ops[0];
    }

    async updateContact(id, contact) {
        await this.collection.updateOne({ _id: id }, { $set: contact });
        return await this.getContactById(id);
    }

    async deleteContact(id) {
        return await this.collection.deleteOne({ _id: id });
    }
}

module.exports = Contacts;
