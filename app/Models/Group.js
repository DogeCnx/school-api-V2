'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    static get primaryKey(){
        return 'group_id'
    }
    
    Student(){
        return this.hasMany('App/Models/Student')
    }
}

module.exports = Group
