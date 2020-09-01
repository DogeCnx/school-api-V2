'use strict'
const Database = use('Database')
const Hash = use('Hash')

function numberTypeParamvalidator(number) {
    if(Number.isNaN(parseInt(number))) {
        //throw new Error(`params : ${number} is not supported, please use number type params instead`) 
        //thorw is return error 
        //return backend-dev

        return { error : `params : ${number} is not supported, please use number type params instead`}
        //retrun fornt-end dev

    }
    return {}

}
class SubjectController {

    async index() {
        const data = await Database.table("subjects");
    
        return data;
      }
    
      async show({ request }) {
        const { subject_id } = request.params;
    
        const validatedValue = numberTypeParamValidator(id);
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined };
    
        const data = await Database.select("*")
          .from("subjects")
          .where({
            subject_id: subject_id,
          })
          .first();
    
        return { status: 200, error: undefined, data: data || {} };
      }
    
      async store({ request }) {
        const { title } = request.body;
    
        if (!title)
          return { status: 422, error: "title is missing.", data: undefined };
    
        await Database.table("subjects").insert({
            title,
        });
    
        return { status: 200, error: undefined, data: { title } };
      }

      async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { title } = body

        const subjectUpdate = await Database.table('subjects').where({subject_id : id }).update({title})
        
        //or display value teacher SELET
        const subject = await Database.table('subjects').where({subject_id : id }).first()

        return {status : 200 , error : undefined ,data : subject }
    }

    async destroy  ({ request }){
        const {id} =request.params
        const subject  = await Database.table('subjects').where({subject_id : id }).delete()

        return {status : 200 , error : undefined ,data : "succeseful"}
    }
}

module.exports = SubjectController
