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

class GroupController {

    async index() {
        const data = await Database.table("groups");
    
        return data;
      }
    
      async show({ request }) {
        const { id } = request.params;
    
        const validatedValue = numberTypeParamValidator(id);
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined };
    
        const group = await Database.select("*")
          .from("groups")
          .where({
            group_id: id,
          })
          .first();
    
        return { status: 200, error: undefined, data: group || {} };
      }
    
      async store({ request }) {
        const { name } = request.body;
    
        if (!name)
          return { status: 422, error: "name is missing.", data: undefined };
    
        await Database.table("groups").insert({
          name,
        });
    
        return { status: 200, error: undefined, data: { name } };
      }


}

module.exports = GroupController
