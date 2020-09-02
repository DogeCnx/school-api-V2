'use strict'
const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')
const Subject = use('App/Models/Subject')

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
function validateFn(request) {
    const rules = {
      title :'required' ,

    }
    const validation = await Validator.validate(request.body, rules)
    if (validation.fails()){
        return {status : 422 ,error : validation.messages() ,data : undefined }
  }
}


class SubjectController {

    async index( {request }) {


      //queryString
      //? /subjects?references=teachers
      //const queryString =require.qs
      //console.log(queryString) debug check
      const {references = undefined} =request.qs //defult {references = undefined}
      //const extractedReferences =references.split(",") //? []   //แยกstring => array
      const subjects =Subject.query()

      // let  subjects = await Database.table("subjects"); => //? selet*form 'subjects';

      //const subjects = await Subject.query().with(extractedReferences ).fetch();

      if(references){
        const extractedReferences =references.split(",")
        subjects.with(extractedReferences)
      }


      return {status : 200 ,error : undefined , data : await subjects.fetch()};
     
    }
    
      async show({ request }) {
        const { subject_id } = request.params;
    
        const validatedValue = numberTypeParamValidator(subject_id);
    
        if (validatedValue.error)
          return { status: 500, error: validatedValue.error, data: undefined };

          let data = await Subject.find(id);  //ใช้แทนด้านล่าง
        // const data = await Database.select("*")
        //   .from("subjects")
        //   .where({
        //     subject_id: subject_id,
        //   })
        //   .first();
    
        return { status: 200, error: undefined, data: data || {} };
      }
    
      // async store({ request }) {
      //   const { title } = request.body;
        
          // const rules = {
          //   title :'required' ,

          // }
          // const validation = await Validator.validate(request.body, rules)
          // if (validation.fails()){
          //     return {status : 422 ,error : validation.messages() ,data : undefined }
          // }
        
      //     await Database.table("subjects").insert({
      //         title,
      //     });
    
      //   return { status: 200, error: undefined, data: { title } };
      // }
      async store({ request }) {
        const { title,teacher_id} = request.body
        const subject = new Subject()
        subject.title = title
        subject.teacher_id = teacher_id
        await subject.save()

        //const subject = await Subject.create({title,teacher_id})
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
     //join table
    async showteacher( {request} ){
      const { id } =request.params
      const subject = await Database
                            .table('subject')
                            .where({subject_id : id })
                            .innerJoin('teachers','subject.teacher_id','teacher_id')
                            .first()
    }
}

module.exports = SubjectController
