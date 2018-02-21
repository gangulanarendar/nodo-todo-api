const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err)
  {
    return console.log('Unable to connect Mongo DB ');
  }
  else{
      console.log('Mongo DB Connected');
      const db=client.db('TodoApp');

    /*  db.collection('Todos').find({'completed':true}).toArray().then((docs)=>{
          console.log('Data',JSON.stringify(docs,undefined,2));
      },(err)=>{
          console.log('unable to fecth the data');
      });

      db.collection('Todos').count({'completed':false}).then((cnt)=>{
          console.log('COunt',cnt);
      },(err)=>{
          console.log('unable to fecth the data');
      });
      */

  /*    db.collection('Todos').deleteMany(
        {text:'walk and cake the dog'}
      )
      .then(
        (result)=>{
          console.log(result);
        }
      );
      */

      db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5a8bed611a7e69eb85ca70aa')}
      ,{
        $set:
        {
          text :'updated text 4'
        },
      
          $inc:
           {
           val: 2
        }

      },
      {
        returnOriginal :false
      }
    ).then((res)=> console.log(res));
  }

client.close();

});
