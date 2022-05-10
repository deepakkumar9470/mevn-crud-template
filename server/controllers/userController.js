import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from "../model/User.js";


class UserContoller{

    static userregister = async (req,res) =>{

         const {name,email,password, confirm_password} = req.body
         console.log(req.body)

         const user = await UserModel.findOne({email:email})

         if(user){
               res.status(400).send({"status" : "failed", "message": "User already exist"})
         }else{
              
            if(name && email && password && confirm_password && tc){
                       
                if(password === confirm_password){
                    
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hasedPassword = await bcrypt.hash(password, salt) 
                        const newuser = new UserModel({
                                name:name,
                                email:email,
                                password:hasedPassword,
                                tc:tc
                             })

                       await newuser.save()

                       const saved_user = await UserModel.findOne({email : email})
                      //GENERATE JWT TOKEN
                       const token = await jwt.sign({userId : saved_user._id}, process.env.JWT_SECRET, {expiresIn : '5d'})

                       res.status(201).send({"status" : "success", "message": "Regustration Successful..", "token" : token})
                    } catch (error) {
                        res.status(400).send({"status" : "failed", "message": "Oops Regustration failed.."})
                    }
                }else{
                    res.status(400).send({"status" : "failed", 
                    "message": "Password & confirm password doesn't matcg"})
                }
            }else{
                res.status(400).send({"status" : "failed", "message": "All fileds are required.."})
            }
         }
    }


    static userlogin = async (req,res) =>{
          
        try {

            const {email, password} = req.body
            if(email && password){

                const user = await UserModel.findOne({email : email})
                if(user !=null){
                  
                    const isMatch = await bcrypt.compare(password, user.password)
                    if(isMatch && (user.email === email)){
                        //GENERATE JWT TOKEN
                       const token = await jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : '5d'})
                        res.status(200).send({"status":"success", "message":"Login Sucessfully", "token": token})
                        
                    }else{
                        res.status(400).send({"status":"failed", "message":"Invalid credentials.."})                       
                    }
                    
                }else{
                    res.status(400).send({"status":"failed", "message":"You are not registered yet.."})
                }

            }else{
                res.status(400).send({"status":"failed", "message":"All fields are required.."})
            }
            
        } catch (error) {
            res.status(400).send({"status":"failed", "message":"Unable to login"})   
        }

    }


    
}



export default UserContoller