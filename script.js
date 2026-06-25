

// Button switch
const ptab=document.getElementById("pendingTab");
const ctab=document.getElementById("completedTab");
const psec=document.getElementById("pendingSection")
const csec=document.getElementById("completedSection")

ptab.addEventListener('click',()=>{
    const ele=document.querySelector(".active");
        if(ele!=ptab){
        ele.classList.remove("active");
        ptab.className+=" active";
        const sec=document.getElementById(`${ele.id.substring(0,ele.id.length-3)}Section`);
        sec.style.display="none";
        psec.style.display="block";
        }
})

ctab.addEventListener('click',()=>{
    const ele=document.querySelector(".active");
    if(ele!=ctab){
    ele.classList.remove("active");
    ctab.className+=" active";
    const sec=document.getElementById(`${ele.id.substring(0,ele.id.length-3)}Section`);
    sec.style.display="none";
    csec.style.display="block";
}
    
})


const form =document.getElementById("taskForm");
const ptask=document.getElementById("allTask");//ol
const ctask=document.getElementById("completedTasks");//ol


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let now=new Date();
    const newele=document.createElement("li");
    newele.innerHTML=`
            <div class="task-title">
                ${document.getElementById("task").value}
            </div>

            <div class="task-time">
                ${now.toLocaleDateString()} | ${now.toLocaleTimeString()}
            </div>

            <div class="task-actions">

                <button class="done-btn">
                    ✓ Done
                </button>

               

                <button class="remove-btn">
                    🗑 Remove
                </button>

            </div>
    `
    const title=newele.querySelector(".task-title");
    const taskTime=newele.querySelector(".task-time");

    const actions=newele.querySelector(".task-actions");
    const edit=document.createElement("button");

    edit.classList.add("edit-btn");
    edit.textContent="✏ Edit";
    edit.addEventListener('click',()=>{
        // one method using promt
        // let newtext=prompt("Enter new Title of taks:",title.textContent.trim())
        // if(newtext!=null){
        //     title.textContent=newtext;
        // }

        // next method using input box
        const input = document.createElement("input");
        input.type = "text";
        input.value = title.textContent.trim();
        input.style.color="blue";
        input.style.fontSize="21px";
        title.replaceWith(input);

        input.focus();

        input.addEventListener("blur", () => {
            if(input.value!="")title.textContent = input.value;
            input.replaceWith(title);
        });

        // input.addEventListener("keyup", (e) => {
        //     if(e.key==="Enter"){
        //     if(input.value!="")title.textContent = input.value;
        //     input.replaceWith(title);}
        // });

        // input.addEventListener("keydown", (e) => {
        //     if(e.key==="Enter"){
        //     if(input.value!="")title.textContent = input.value;
        //     input.replaceWith(title);}
        // });

    })
    actions.append(edit);
    ptask.append(newele);


    const done=newele.querySelector(".done-btn");
    done.addEventListener('click',()=>{
        if(done.textContent.trim()=="✓ Done"){
        ptask.removeChild(newele);
        ctask.append(newele);
        done.style.backgroundColor="orange";
        done.textContent="❌ Not Done";
        actions.removeChild(edit);
        let t=new Date();
        taskTime.textContent=`Completed At : ${t.toLocaleDateString()} | ${t.toLocaleTimeString()}`
    }
    else{
        ctask.removeChild(newele);
        done.style.backgroundColor="#00c853";
        done.textContent="✓ Done";
        
        ptask.append(newele);
        actions.append(edit);
        let t=new Date();
        taskTime.textContent=`Arrived At: ${t.toLocaleDateString()} | ${t.toLocaleTimeString()}`
        }

    });

    const rem=newele.querySelector(".remove-btn");
    rem.addEventListener('click',(e)=>{
        let result=confirm(`Are you sure to delete this taks:${newele.querySelector(".task-title").textContent}`);
        if(result)newele.remove();
    })



})




