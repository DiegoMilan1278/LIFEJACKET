//---------------COMPRRAS--------------------//

const { MongoClient, Db } = require("mongodb");
// Connection URI
const uri = "mongodb+srv://LifeJacket:lifejacket123@cluster0.yrvnibf.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    
    // //insertone
    // await Createone(client , {
    //     "ID_Compra": 100,
    //     "City": "Leticia",
    //     "Date": "2023-19-12",
    //     "Payment method": "Efectivo",
    //     "Purchase price": 16550000,
    //     "State": "Habilitado"
    // });

    // //insertmany
    // await CreateMany(client,[{
    //     "ID_Compra": 101,
    //     "City": "Puerto triunfo",
    //     "Date": "2020-19-02",
    //     "Payment method": "Intercambio",
    //     "Purchase price": 86550000,
    //     "State": "Deshabilitado"
    // },
    // {
    //     "ID_Compra": 102,
    //     "City": "Leticia",
    //     "Date": "2021-05-02",
    //     "Payment method": "Efectivo",
    //     "Purchase price": 22550000,
    //     "State": "Habilitado"
    // },
    // {
    //     "ID_Compra": 103,
    //     "City": "Pasto",
    //     "Date": "2022-09-12",
    //     "Payment method": "Intercambio",
    //     "Purchase price": 112550000,
    //     "State": "Deshabilitado"
    // }]
    // )


//     // //Findone
    // await FindOne(client);

//     // //Find
// await buscar(client);


//     // //Updateone y ##upsert##
// await ActualizarUno(client);

//     // //UpdateMany
// await ActualizarVarios(client);


//     // //Deleteone
// await borraruno(client);

//     // //DeleteMany
// await borrarvarios(client);

//    //  //Drop Collection
// const result1 = await dropCollection(client);

//   //  //Drop DATABASE
// const result = await dropDatabase(client);

//  // //Pipelines and Sort
// const result1 = await pipelinesCompras0(client);
// const result2 = await pipelinesCompras1(client);
// const result3 = await pipelinesCompras2(client);


// // //Lookup
const result = lookup(client)
result.forEach(element => {
  console.log(element)  
})

    await client.db("admin").command({ ping: 1 });
    // console.log("Connected successfully to server");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

////////// Aqui desarrollamos la funciones asincronas 

///////////////////////////////crud node///////////////////////////
/////////////*****Create *****///////////////////
//insertone
async function Createone(client , compra){
  await client.db("LifeJacket").collection("Compras").insertOne(compra);
  console.log("New purchase created");
}

//insertmany
async function CreateMany(client, compras){
  await client.db("LifeJacket").collection("Compras").insertMany(compras);
  console.log("New purchases created");
}

/////////////***** Read ******///////////
//Findone
async function  FindOne(client){
  const query = {ID_Compra: 69}
  const  result = await client.db("LifeJacket").collection("Compras").findOne(query);
  console.log(result)
}

//Find and Example Limit
async function buscar(client){
  const query = {City: 'Cali'}
  const  result = await client.db("LifeJacket").collection("Compras").find(query).limit(2).toArray();
  console.log(result)
}

/////////////***** Update *******///////////////////////////

//     // //Updateone
async function ActualizarUno(client){
  const query ={ID_Compra: 102};
  const result = await client.db("LifeJacket").collection("Compras").updateOne(query,{$set:{'Purchase price': 39000000}});
  console.log("Successful update")
}

//     // //Updateone with ##upsert##
async function ActualizarUno(client){
  const query ={ID_Compra: 104};
  const X = await client.db("LifeJacket").collection("Compras").updateOne(query,{$set:{Date: "2019-25-01"}}, {upsert:true} );
  console.log(X)
  console.log("Successful update")
}

//    // //UpdateMany
async function ActualizarVarios(client){
  const query = {City: "Cali"}
  const  X = await client.db("LifeJacket").collection("Compras").updateMany(query,{$set: {City: "Pasto"}});
  console.log("Successful update")
  console.log(X)
}

//////////  THE UPSERT DOES NOT WORK IN UPDATEMANY /////////////////////////////

/////////////***** Delete ******////////////
//     // //Deleteone
async function borraruno(client){
  const query={ID_Vendedor: 104};
  const X =await client.db("LifeJacket").collection("Compras").deleteOne(query);
  console.log(X);
  console.log("Correct deletion")
}

    // //DeleteMany
async function borrarvarios(client){
  const query={City: "Pasto"};
  const X =await client.db("LifeJacket").collection("Compras").deleteMany(query);
  console.log(X);
  console.log("Correct deletion")
}

//  // //drop Collection
const dropCollection = (client) => {
    try{
        const result = client.db("LifeJacket").collection("Compras").drop()
        console.log('The collection was successfully deleted!!')
        return result
    }catch(error){
        console.log(error)
    }
}


//  //  //drop database
const dropDatabase = (client) => {
    try{
        const result = client.db("LifeJacket").dropDatabase()
        console.log('Deleted database successfully!!')
        return result
    }catch(error){
        console.log(error)
    }
}


//  //  //Unwind
///-------------The $unwind fails, since we don't have an array-------------///


//  //  //Pipelines and Examples Sort
//01 Pipeline
const pipelinesCompras0 = (client) => {
  try{
    const result1 = client.db("LifeJacket").collection("Compras").aggregate([
      {$match: {City: {$eq: "Medelllin"}}},
      {$project: {_id: 0, City: 1, 'Payment method': 1, Date: 1}},
      {$sort: {Date: 1}}
    ])
    return result1
  }catch(error){
    console.error      
  }
}
//02 Pipeline
const pipelinesCompras1 = (client) => {
  try{
    const result2 = client.db("LifeJacket").collection("Compras").aggregate([
      {$match: {ID_Compra: {$eq: 59}}},
      {$project: {_id: 0, City: 1, ID_Compra: 1, Date: 1, 'Purchase price': 1}},
      {$sort: {Date: -1}}
    ])
    return result2
  }catch(error){
    console.error      
  }
}

//03 Pipeline
const pipelinesCompras2 = (client) => {
  try{
    const result3 = client.db("LifeJacket").collection("Compras").aggregate([
      {$match: {ID_Compra: {$eq: 7}}},
      {$project: {_id: 0, ID_Compra: 1, Date: 1, 'Purchase price': 1, State: 1}},
      {$sort: {Date: 1}}
    ])
    return result3
  }catch(error){
    console.error      
  }
}

//------Lookup------//
//--------------There are no equal fields to use it--------------//