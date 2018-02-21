const expect=require('expect');
const supertest=require('supertest');


const {app}=require('./../server');
const {Todo}=require('./../models/Todo');


var todos=[{text :'first todo'},{text :'second todo'}];
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
   return Todo.insertMany(todos);
 }).then(()=>{done()});
});


describe('GET /todos test',()=>{
 it('should be get all the todos',(done)=>{
   supertest(app)
   .get('/todos')
   .expect(200)
   .end((err,res)=>{
       if(err)
       {
         return done(err);
       }

       Todo.find().then((todos)=>{
         expect(todos.length).toBe(2);
       //  expect(todos[0].text).toBe(text);
         done();
       }).catch((e)=>done(e));

 })

});
});
describe('Post /todos',()=>{
it('should create a new todo',(done)=>{
  var text='Test todo text';
  supertest(app)
  .post('/todos')
  .send({text})
  .expect(200)
  .expect((res)=>{
    expect(res.body.text).toBe(text);
  })
  .end((err,res)=>{
    if(err)
    {
      return done(err);
    }

    Todo.find().then((todos)=>{
      expect(todos.length).toBe(3);
    //  expect(todos[0].text).toBe(text);
      done();
    }).catch((e)=>done(e));
  });
});


it('should not create a new Todo',(done)=>{
  supertest(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err,res)=>{
    if(err)
    {
      return done(err);
    }

        Todo.find().then((todos)=>{
          console.log('todos.length',todos.length );
          expect(todos.length).toBe(2);

          done();
        }).catch((e)=>done(e));

  });
});
}
);
