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


class EnrollmentController {

    
    async index(){
        const enrollments  = await Database.table('enrollments');

        return {status :200 ,error : undefined ,data : enrollments }
    }

    async show({ request }){
        const { enrollment } = request.params

        //check type { id }
        console.log(typeof parseInt(enrollment))
        const validatedValue = numberTypeParamvalidator(enrollment)

        if(validatedValue.error){
            return {status : 500 ,error : validatedValue.error, data : undefined }
        }



        const enrollments  = await Database.select('*').from('enrollments').where("enrollment",student_id).first()

        return {status :200 ,error : undefined ,data : enrollments || {} }  //0,"",false,undifined,null ==> false
        //function much return one type ever!!
    }


    async store({ request }) {

        const {mark } = request.body

        const rules = {
            mark :'required' ,

        }
        const validation = await Validator.validate(request.body, rules)
        if (validation.fails()){
            return {status : 422 ,error : validation.messages() ,data : undefined }
        }
        // const missingKey = []
        // if(!mark) missingKey.push('mark')


        // if (missingKey.length){
        //     return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
        // }


        const hashedPassword = await Hash.make(password)

        const enrollments  = await Database
            .table('enrollments')
            .insert({mark})


        return {status : 200 , error : undefined ,data : enrollments  }

    }

    async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { mark } = body

        const enrollmentsUpdate = await Database.table('enrollments').where({enrollment_id : id }).update({mark})
        
        //or display value teacher SELET
        const enrollments = await Database.table('enrollments').where({enrollment_id : id }).first()

        return {status : 200 , error : undefined ,data : group }
    }

    async destroy  ({ request }){
        const {id} =request.params
        const enrollments  = await Database.table('enrollments').where({enrollment_id : id }).delete()

        return {status : 200 , error : undefined ,data : "succeseful"}
    }

}

module.exports = EnrollmentController
