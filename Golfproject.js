//get api url
const api_url = 'https://golf-courses-api.herokuapp.com/courses/';
//get all the courses
async function getAvailableCourses(url) {
    const response = await fetch(url);
    var data = await response.json(); 
    show(data);
} 
//call the function
getAvailableCourses(api_url); 

var courseOptionsHtml = ''
//function to show all the courses that are avialable  
function show(data){ 
    console.log(data); 
    var search = document.getElementById('course-select'); 
    //Go through all the data
    for (let i = 0; i < data.courses.length; i++){ 
        var courses = data.courses[i]; 
        console.log(courses); 
        //store the data
        courseOptionsHtml += `<option value="${courses.id}">${courses.name}</option>`; 
    } 
    //put the data in the selection box
    search.innerHTML = courseOptionsHtml; 
    return courses;
}  

let input;
function saveInput(){ 
    input = document.getElementById('course-select').value;
    const api_url2 = `https://golf-courses-api.herokuapp.com/courses/${input}`; 

    let teeBoxSelectHtml = '';  
    async function getAvailableCourses2(url2) {
        const response = await fetch(url2);
        var tee = await response.json(); 
        teeTable(tee); 
    }  
    getAvailableCourses2(api_url2);

    function teeTable(tee){ 
        console.log(tee); 
        var data = tee.data.holes;  
        
        for (let i = 0; i < data.length; i++){ 
            var holes = data[i]; 
            var teeBoxes = holes.teeBoxes; 
            
        }  
        let counter = 1;
        for(let j = 0; j < teeBoxes.length; j++){ 
            var wut = teeBoxes[j]; 
            var courseHoleTeeBoxId = wut.courseHoleTeeBoxId; 
            var teeType = wut.teeType; 
            var teeTypeId = wut.teeTypeId
            var yards = wut.yards; 
            teeBoxSelectHtml += `<option id="${teeTypeId}" value="${courseHoleTeeBoxId}">${teeType.toUpperCase()}, ${yards} yards</option>`; 
            counter++;
        } 
        document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
    } 
    
}  
let input2;
function saveTeeBox(){ 
    input2 = document.getElementById('course-select').value; 
    const api_url3 = `https://golf-courses-api.herokuapp.com/courses/${input2}`; 
    async function getAvailableCourses2(url3) {
        const response = await fetch(url3);
        var tee2 = await response.json(); 
        saveTable(tee2); 
    }  
    getAvailableCourses2(api_url3); 

    function saveTable(tee2){ 
        var data = tee2.data.holes;   
        let addNum2 = ''; 
        let addNum3 = ''; 
        let addNum4 = ''; 
        let counter = 0; 
        let counter2 = 0;
        for (let i = 0; i < data.length; i++){ 
            var holes = data[i]; 
            var hole = holes.hole; 
            console.log(hole);
            var teeBoxes = holes.teeBoxes; 
            console.log(teeBoxes); 
            for(let j = 0; j < teeBoxes.length; j++){ 
                var wut = teeBoxes[j]; 
                var yards = wut.meters;  
                var par = wut.par; 
                var handicap = wut.hcp;
                var teeType = wut.teeType; 
                var teeTypeId = wut.teeTypeId 
        
                console.log(teeTypeId);
                //
                var bruh = document.getElementById('tee-box-select'); 
                var input = bruh.options[bruh.selectedIndex];
                input = input.id;
                console.log(input);
                if (input == teeTypeId){ 
                    console.log('true'); 
                    //
                    var yardage = document.getElementById('row2'); 
                    var row3 = document.getElementById('row3'); 
                    var row4 = document.getElementById('row4'); 
                    // 
                    var th2 = `<th scope="row">Yardage</th>`; 
                    var In = `<td id=${counter}></td>`; 
                    var total = `<td id=${counter}></td>`;
                    addNum2 += `<td id=${counter}>${yards}</td>`; 
                    sum = th2 + addNum2 + In + total; 
                    if (counter = 20){ 
                        yardage.innerHTML = sum;  
                    }

                    //
                    var th3 = `<th scope="row">Par</th>`;
                    addNum3 += `<td>${par}</td>`; 
                    sum2 = th3 + addNum3 + In + total; 
                    if (counter = 20){ 
                        row3.innerHTML = sum2;  
                    }
                    // 
                    var th4 = `<th scope="row">Handicap</th>`;
                    addNum4 += `<td>${handicap}</td>`; 
                    sum3 = th4 + addNum4 + In + total; 
                    if (counter = 20){ 
                        row4.innerHTML = sum3;  
                    } 
                } 
                else if (teeTypeId != input){ 
                    console.log('wut'); 
                } 
            } 
            counter ++;
        }  
    }
}


let counter = 0; 
let counter2 = 0;
function addPlayer(){ 
    var input = document.getElementById('input'); 
    var output = document.getElementById('body'); 
   
    var tr = document.createElement('tr'); 
    tr.setAttribute("id", `row${counter + 5}`); 
    output.appendChild(tr);
   
    var th = ''; 
    th += `<th scope="row" id="name${counter}">${input.value}</th>`; 
    tr.innerHTML += th; 

    for (let i = 0; i < 21; i++){ 
        if (i < 19){
        var playerInput = ''; 
        playerInput += `<td id="row${counter}, column${i}"><input id="inputRow${counter}, inputColumn${i}"/></td>`; 
        tr.innerHTML += playerInput; 
        var total = ''; 
        } 
        else if(i === 20){ 
            playerInput += `<td id="${i}"></td>` 
            tr.innerHTML += playerInput; 
        }
    }  
    counter++;
} 



