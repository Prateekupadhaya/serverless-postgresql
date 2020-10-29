const db = require('./db_connect');
module.exports.tables = async event => {
  try{
    const res = await db.query('SELECT * FROM client');
    db.disconnect();
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };
}
  catch(e){
    console.log(e);
  }
};

//insert users

module.exports.insert = async event => {
  try{
    const res = JSON.parse(event.body);
    await db.insert(res);
    db.disconnect();
    return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User Inserted',res
    })
  };
}
  catch(e){
    console.log(e);
  }
};

//delete user

/*module.exports.delete = async event => {
  try{
    const res = await JSON.parse(event.body);
    await db.deleteById(res.client_id);
    db.disconnect();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User deleted',res
    })
  };
}
  catch(e){
    console.log(e);
  }
};*/
module.exports.delete = async event => {
  const id = JSON.parse(event.body.client_id);

  db.query('DELETE FROM client WHERE client_id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).send(`User deleted with ID:' ${id}`);
  });
};

//update user

module.exports.update = async event => {
  try{
    const res = JSON.parse(event.body);
    let id = res.client_id;
    await db.updateById(res,{where: { id: id }});
    db.disconnect();
    return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User Updated',res
      })
    };
  }
  catch(e){
    console.log(e);
    }
  };


