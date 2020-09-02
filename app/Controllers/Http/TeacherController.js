'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Teacher = use('App/Models/Teacher')


//new RegExp(/hello/gi).test("Hello World")
//new RegExp("hello","gi").test("Hello World")
const Validator = use('Validator')

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

    // async index(){
    //     const teachers = await Database.table('teachers');

    //     return {status :200 ,error : undefined ,data : teachers }
    // }
    async index( {request }) {

        const {references = undefined} =request.qs 
        const teachers =Teacher.query()
    
        if(references){
          const extractedReferences =references.split(",")
          teachers.with(extractedReferences)
        }
    
        return {status : 200 ,error : undefined , data : await teachers.fetch()};
       
    }

    // async show({ request }){
    //     const { id } = request.params

    //     //check type { id }
    //     console.log(typeof parseInt(id))
    //     const validatedValue = numberTypeParamvalidator(id)

    //     if(validatedValue.error){
    //         return {status : 500 ,error : validatedValue.error, data : undefined }
    //     }



    //     const teachers = await Database.select('*').from('teachers').where("teacher_id",id).first()

    //     return {status :200 ,error : undefined ,data : teachers || {} }  //0,"",false,undifined,null ==> false
    //     //function much return one type ever!!
    // }
    async show({ request }) {
        const { teacher_id } = request.params;
      
        const validatedValue = numberTypeParamValidator(teacher_id);
      
        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined };
    
        let data = await Teacher.find(teacher_id);  //ใช้แทนด้านล่าง
    
      
        return { status: 200, error: undefined, data: data || {} };
    }


    // async store({ request }) {

    //     const {first_name ,last_name , email ,password } = request.body


    //     const rules = {
    //         frist_name :'required' ,
    //         last_name : 'required',
    //         email :'required|email|unique:teachers,email' , //this like callfunction unique("teachers") 
    //         password : 'required|min:8|max:16' //min(8)
    //     }
    //     const validation = await Validator.validate(request.body, rules)
    //     if (validation.fails()){
    //         return {status : 422 ,error : validation.messages() ,data : undefined }
    //     }

    //     // const missingKey = []
    //     // if(!first_name) missingKey.push('first_name')
    //     // if(!last_name) missingKey.push('last_name')
    //     // if(!email) missingKey.push('email')
    //     // if(!password) missingKey.push('last_name')

    //     // if (missingKey.length){
    //     //     return {status : 422 ,error : `${missingKey} is missing.` ,data : undefined }
    //     // }

    //     const hashedPassword = await Hash.make(password)

    //     const teacher = await Database
    //         .table('teachers')
    //         .insert({first_name ,last_name , password : hashedPassword,email})


    //     return {status : 200 , error : undefined ,data : {first_name ,last_name  ,email} }

    // }
    async store({ request }) {
        const  {first_name ,last_name , email ,password }  = request.body
        const teachers = await Subject.create({first_name ,last_name , password,email})
        await Teacher.save()
    
    
        return { status: 200, error: undefined, data: teachers };
    }

    async update( {request} ) {

        const {body , params } = request
        const { id } = params
        const { first_name, last_name ,email } = body

        const teacherUpdate = await Database.table('teachers').where({teacher_id : id }).update({first_name ,last_name  ,email})
        
        //or display value teacher SELET
        const teacher = await Database.table('teachers').where({teacher_id : id }).first()

        return {status : 200 , error : undefined ,data : teacher }
    }

    async destroy  ({ request }){
        const {id} =request.params
        const teacher  = await Database.table('teachers').where({teacher_id : id }).delete()

        return {status : 200 , error : undefined ,data : "succeseful"}
    }
}

module.exports = TeacherController
