'use strict'

const { any } = require('@adonisjs/framework/src/Route/Manager');
const { dates } = require('@adonisjs/lucid/src/Lucid/Model');

const Model = use('Model')

class Subject extends Model {
    
    static get primaryKey(){
        return 'subject_id'
    }

    static get createdAtColumn() {
        return null;

    }

    static get updatedAtColumn(){
        return null;
    }
    
    Teacher(){
        return this.belongsTo('App/Models/Teacher')
    }
    Enrollment(){
        return this.hasMany('App/Models/Enrollment')
    }

}

module.exports = Subject
