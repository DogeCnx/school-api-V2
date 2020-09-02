'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
const Group = use('App/Models/Group')

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

class GroupController {

    // async index() {
    //     const data = await Database.table("groups");
    
    //     return data;
    //   }
    async index( {request }) {

      const {references = undefined} =request.qs 
      const groups = Group.query()
  
      if(references){
        const extractedReferences =references.split(",")
        groups.with(extractedReferences)
      }
  
      return {status : 200 ,error : undefined , data : await groups.fetch()};
     
  }
    
      // async show({ request }) {
      //   const { id } = request.params;
    
      //   const validatedValue = numberTypeParamValidator(id);
    
      //   if (validatedValue.error)
      //     return { status: 500, error: validatedValue.error, data: undefined };
    
      //   const group = await Database.select("*")
      //     .from("groups")
      //     .where({
      //       group_id: id,
      //     })
      //     .first();
    
      //   return { status: 200, error: undefined, data: group || {} };
      // }
    async show({ request }) {
        const { group_id } = request.params;
      
        const validatedValue = numberTypeParamValidator(group_id);
      
        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined };
    
        let data = await Group.find(group_id);  //ใช้แทนด้านล่าง
    
      
        return { status: 200, error: undefined, data: data || {} };
    }
    
      // async store({ request }) {
      //   const { name } = request.body;
    
        
      //   const rules = {
      //       name :'required' ,

      //   }
      //   const validation = await Validator.validate(request.body, rules)
      //   if (validation.fails()){
      //       return {status : 422 ,error : validation.messages() ,data : undefined }
      //   }

        
      //   await Database.table("groups").insert({
      //     name,
      //   });
    
      //   return { status: 200, error: undefined, data: { name } };
      // }

    
      
    async store({ request }) {
      const { name,group_id} = request.body
      const  groups = await Group.create({group_id, name })
      await  Group.save()


      return { status: 200, error: undefined, data: {group_id, name } };
    }
    async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { name } = body

        const groupUpdate = await Database.table('groups').where({group_id : id }).update({name})
        
        //or display value teacher SELET
        const group = await Database.table('groups').where({group_id : id }).first()

        return {status : 200 , error : undefined ,data : group }
    }

    async destroy  ({ request }){
        const {id} =request.params
        const subject  = await Database.table('groups').where({group_id : id }).delete()

        return {status : 200 , error : undefined ,data : "succeseful"}
    }


}

module.exports = GroupController
