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


class TeacherController {

    async index(){
        const teachers = await Database.table('teachers');

        return {status :200 ,error : undefined ,data : teachers }
    }

    async show({ request }){
        const { id } = request.params

        //check type { id }
        console.log(typeof parseInt(id))
        const validatedValue = numberTypeParamvalidator(id)

        if(validatedValue.error){
            return {status : 500 ,error : validatedValue.error, data : undefined }
        }



        const teachers = await Database.select('*').from('teachers').where("teacher_id",id).first()

        return {status :200 ,error : undefined ,data : teachers || {} }  //0,"",false,undifined,null ==> false
        //function much return one type ever!!
    }


    async store({ request }) {

        const {first_name ,last_name , email ,password } = request.body

        const missingKey = []
        if(!first_name) missingKey.push('first_name')
        if(!last_name) missingKey.push('last_name')
        if(!email) missingKey.push('email')
        if(!password) missingKey.push('last_name')

        if (missingKey.length){
            return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
        }


        const hashedPassword = await Hash.make(password)

        const teacher = await Database
            .table('teachers')
            .insert({first_name ,last_name , password : hashedPassword,email})


        return {status : 200 , error : undefined ,data : {first_name ,last_name  ,email} }

    }
}

module.exports = TeacherController
