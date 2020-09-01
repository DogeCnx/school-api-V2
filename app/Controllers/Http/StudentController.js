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


class StudentController {

    
    async index(){
        const students = await Database.table('students');

        return {status :200 ,error : undefined ,data : students }
    }

    async show({ request }){
        const { student_id } = request.params

        //check type { id }
        console.log(typeof parseInt(student_id))
        const validatedValue = numberTypeParamvalidator(student_id)

        if(validatedValue.error){
            return {status : 500 ,error : validatedValue.error, data : undefined }
        }



        const students = await Database.select('*').from('students').where("student_id",student_id).first()

        return {status :200 ,error : undefined ,data : students || {} }  //0,"",false,undifined,null ==> false
        //function much return one type ever!!
    }


    async store({ request }) {

        const {first_name ,last_name , email ,password } = request.body

        const missingKey = []
        if(!first_name) missingKey.push('first_name')
        if(!last_name) missingKey.push('last_name')
        if(!email) missingKey.push('email')
        if(!password) missingKey.push('password')

        if (missingKey.length){
            return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
        }


        const hashedPassword = await Hash.make(password)

        const students = await Database
            .table('students')
            .insert({first_name ,last_name , password : hashedPassword,email})


        return {status : 200 , error : undefined ,data : {first_name ,last_name  ,email} }

    }

    async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { first_name, last_name ,email } = body

        const studentUpdate = await Database.table('students').where({student_id : id }).update({first_name ,last_name  ,email})
        
        //or display value teacher SELET
        const student = await Database.table('students').where({student_id : id }).first()

        return {status : 200 , error : undefined ,data : teacher }
    }

    async destroy  ({ request }){
        const {id} =request.params
        const student  = await Database.table('students').where({student_id : id }).delete()

        return {status : 200 , error : undefined ,data : "succeseful"}
    }
}

module.exports = StudentController
