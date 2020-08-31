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

        const missingKey = []
        if(!mark) missingKey.push('mark')


        if (missingKey.length){
            return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
        }


        const hashedPassword = await Hash.make(password)

        const enrollments  = await Database
            .table('enrollments')
            .insert({mark})


        return {status : 200 , error : undefined ,data : enrollments  }

    }
}

module.exports = EnrollmentController
