/*
 console.log("\x1b[36m%s\x1b[0m", "This is cyan");
 console.log("\x1b[35m%s\x1b[0m", "This is magenta")
 */

const fs = require('fs');
const readline = require('readline');

const help = fs.readFileSync('help.txt', 'utf8');
console.log('\x1b[35m%s\x1b[0m', help);

const taskArray = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loop(){

  const arrLen = taskArray.length;


  rl.question('>>> ', (taskData)=>{
    const [mainCmd, ...name] = taskData.split(' ');
    const newTask = name.join(' ');
    const cmd = mainCmd.toLowerCase().trim();

    

    if (cmd === 'add'){
      fs.appendFileSync('syncTask.txt', newTask + '\n');
      console.log('Task added successfully.');
      taskArray.push(`${arrLen + 1}. ${newTask}`);
      console.log(taskArray)
      loop();
  } 
    else if(cmd === 'help'){
      console.log('\x1b[35m%s\x1b[0m', help);
      loop();
    }
    else if(cmd === 'incomplete'){
      console.log('\x1b[36m%s\x1b[0m', fs.readFileSync('syncTask.txt', 'utf8'));
      loop();
  }
    else if(cmd === 'complete'){
      console.log('\x1b[36m%s\x1b[0m', fs.readFileSync('task.txt', 'utf8'));
      loop();
  }
    else if(cmd === 'clear'){
      fs.writeFileSync('syncTask.txt', '');
      fs.writeFileSync('task.txt', '');
      console.log('All task are removed!');
      loop();
    }

    else if(cmd === 'done'){
      if(fs.existsSync('syncTask.txt')){
        //const syncTasks = fs.readFileSync('syncTask.txt', 'utf8');
        
        // array part 
        const taskLen = parseInt(newTask);
        
        if (newTask) {
          fs.writeFileSync('task.txt', taskArray[taskLen - 1] + '\n');
          console.log(`${taskArray[taskLen - 1]} is done.`)

        }

        //fs.writeFileSync('task.txt', syncTasks + '\n');
       // fs.writeFileSync('syncTask.txt', '')

      } else{
        console.log('compiling error...')
      }
      loop();
    }

    else if(cmd === 'tasks'){
      const complete = fs.readFileSync('task.txt', 'utf8');
      const incomplete = fs.readFileSync('syncTask.txt', 'utf8');
      
      // if task available
      if (complete !== "") {
        console.log(`COMPLETE \n${complete}\n`);
      } else {
        console.log("COMPLETE \n -Empty-");
      }

      // if task unavailable
      if (incomplete !== "") {
        console.log(`INCOMPLETE \n${incomplete}`);
      } else {
        console.log("INCOMPLETE \n -Empty-");
      }
      loop();
    }

    else if (cmd === "remove") {
      if (newTask) {
        const taskLen = parseInt(newTask);
        taskArray.splice(taskLen - 1, 1);
        console.log("Task remove successfully!")
      }
      loop();
    }


    else if(cmd === 'exit'){
      console.log();
      rl.close();
    }
    else {
      console.log("Command not found! enter 'help'");
      loop();
  }      
 });
}

loop();



