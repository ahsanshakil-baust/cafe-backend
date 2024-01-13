const express = require("express");
const connection = require("../connection");
const router = express();

router.post("/signup", (req, res) => {
  const user = req.body;
  const query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        const query =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, result) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "Email Already Exist.",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  const user = req.body;
  const query = "select email,password,role,status from user where email=?";
  connection.query(query,[user.email],(err,result)=>{
    if(!err){
      if(result.length<=0 || result[0].password !==user.password){
        return res.status(401).json({message:"Incorrect Username or Password"})
      }
      else if(result[0].status==="false"){
        return res.status(401).json({message:"Wait for Admin Approval"})
      }
      else if(result[0].password===user.password){

      }else{
        result.status(400).json({message:"Something went wrong please try agin later."})
      }
    }else{
      return res.status(500).json(err)
    }
  })
});

module.exports = router;
