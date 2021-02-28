import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import users from "../../../users.json";

// interface CreateUserProps {
//   name: string;
//   challengesCompleted: number;
//   level: number;
//   currentExperience: number;
//   totalExperience:number;
// }

export default function createUser(req:NextApiRequest,res:NextApiResponse) {
  const { user }= req.body
  
  user.totalExperience = 0;
  for(let index = 1;index < user.level;index++){
    user.totalExperience += Math.pow((index + 1) * 4, 2)
  }
  user.totalExperience += user.currentExperience;

  const index = users.findIndex(user => user.name === user.name)
  if(index != -1) users[index] = user;
  else users.push(user);

  console.log(user)
  fs.writeFileSync('users.json', JSON.stringify(users,null,4));
}
