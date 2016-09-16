/**
 * Data.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoPK: true,
    attributes: {
        department: {
            model: 'Department'
        },
        indicator: {
            model: 'Indicator'
        },
        years: {
            collection: 'Years'
        },
        criterias: {
            collection: 'DataDetail'
        },
        periodType: {
            type: 'string',
            enum: ['academic', 'calendar']
        },
        public: {
            type: 'string'
        }
    }
};
