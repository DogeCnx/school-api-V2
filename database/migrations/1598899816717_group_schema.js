'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments('group_id')
      table.string('name',100)
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupSchema
