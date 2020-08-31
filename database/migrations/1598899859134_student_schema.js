'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments('student_id')
      table.string('frist_name',120).notNullable()
      table.string('last_name',120).notNullable()
      table.string('email',255).notNullable().unique() //default length 255
      table.integer('password').notNullable()
      table.integer('group_id').unsigned() // convert group_id to unsigend int
      table.timestamps() //auto create 2 colum_at,update_at

      table
        .foreign('group_id')
        .references('groups.group_id')
        .onDelete('CASCADE') // มีการลบ มีการเปลี่ยนในFKจะไปแก้ทุกตาราง
        .onUpdate('CASCADE')  //มีการupdate มีการเปลี่ยนในFKจะไปแก้ทุกตาราง
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
