const db = require("./db");

const Query = {
  greeting: () => {
    return "hello from  TutorialsPoint !!!";
  },
  students: () => db.students.list(),
  studentById: (root, args, context, info) => {
    return db.students.get(args.id);
  },
};

const Student = {
    fullName:(root,args,context,info) => {
       return root.firstName+":"+root.lastName
    }
 }

module.exports = { Query,Student };
