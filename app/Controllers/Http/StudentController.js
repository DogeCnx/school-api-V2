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

        const {frist_name ,last_name , email ,password } = request.body


        const rules = {
            frist_name :'required' ,
            last_name : 'required',
            email :'required|email|unique:students,email' , //this like callfunction unique("teachers") 
            password : 'required|min:8|max:16' //min(8)
        }
        const validation = await Validator.validate(request.body, rules)
        if (validation.fails()){
            return {status : 422 ,error : validation.messages() ,data : undefined }
        }
        // const missingKey = []
        // if(!frist_name) missingKey.push('frist_name')
        // if(!last_name) missingKey.push('last_name')
        // if(!email) missingKey.push('email')
        // if(!password) missingKey.push('password')

        // if (missingKey.length){
        //     return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
        // }


        //const hashedPassword = await Hash.make(password)


        

        const students = await Database
            .table('students')
            .insert({frist_name ,last_name , password :password ,email})


        return {status : 200 , error : undefined ,data : {frist_name ,last_name  ,email} }

    }

    async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { frist_name, last_name ,email } = body

        const studentUpdate = await Database.table('students').where({student_id : id }).update({frist_name ,last_name  ,email})
        
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
