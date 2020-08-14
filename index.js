// 선택자
const todoInput = document.querySelector('.todo_input');
const addButton = document.querySelector('.add_btn');
const todo = document.querySelector('.todo'); // ul태그
const select = document.querySelector('select');
// 이벤트
document.addEventListener('DOMContentLoaded',getTodo);
addButton.addEventListener('click', addTodo);
todo.addEventListener('click', checkTodo);
select.addEventListener('click', filterTodo);
// 함수
function addTodo(event){
    event.preventDefault(); // 페이지 이동 방지
    let inputMemory;
    let exit = false; // 함수 종료를 위한 bool
    if(localStorage.getItem('inputMemory') === null)
        inputMemory = [];
    else    
        inputMemory = JSON.parse(localStorage.getItem('inputMemory'));
    inputMemory.forEach(function(inputValue){
        // 이미 입력을 한 값인 경우 팝업 후 함수 종료
        if(inputValue === todoInput.value){
            alert('You already wrote it!!');
            exit = true;
        }
    })
    // 입력을 하지않을 경우 팝업 후 함수 종료
    if(todoInput.value === ''){
        alert('Write Something!!');
        exit = true;
    }
    if(exit)
        return 0;
    // div > li > button 순으로 생성 후 부모 ul로 append 시킴
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo_list');
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo_content');
    todoLi.innerText = todoInput.value;
    const completedButton = document.createElement('button');
    const removedButton = document.createElement('button');
    completedButton.classList.add('completed_btn');
    removedButton.classList.add('removed_btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    removedButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.append(todoLi,completedButton,removedButton);
    todo.appendChild(todoDiv);
    // 로컬저장소에 입력값을 저장
    saveTodo(todoInput.value);
    // 입력과 동시에 입력값 초기화
    todoInput.value='';
}
function checkTodo(e){
    const target = e.target;    // todoDiv 자식요소
    const todoDiv = target.parentElement;   // todoDiv
    if(target.classList[0] === 'completed_btn'){
        // 체크/취소 가능
        todoDiv.classList.toggle('completed');
    }
    else if(target.classList[0] === 'removed_btn'){
        todoDiv.classList.add('removed');
        // 삭제된 todoDiv의 li요소의 텍스트를 넘김
        // 로컬저장소에 저장된 배열의 원소들 중 삭제된 li 요소의 텍스트
        // 와 같은 원소를 삭제함
        removeTodo(todoDiv.children[0].innerText);
        // 트랜지션 효과가 끝나고 해당 todoDiv 제거
        todoDiv.addEventListener('transitionend',function(){
            // 트랜지션 효과가 끝나고 시간 지연후에 해당 todo 제거
            setTimeout(() => {
                todoDiv.remove();
            }, 400);
        })
    }
}
function filterTodo(e){
    const target = e.target;
    const optionValue = target.value;
    // children은 배열이 아닌 HTML Collection이기 때문에
    // Array.prototype.slice.call로 배열로 변환
    const todoDivs = Array.prototype.slice.call(todo.children);
    todoDivs.forEach(function(todoDiv){
        switch(optionValue){
            case 'All':
                    todoDiv.style.display = 'flex';
                break;
            case 'Completed':
                if(todoDiv.classList.contains('completed'))
                    todoDiv.style.display = 'flex';
                else
                    todoDiv.style.display = 'none';
                break;
            case 'Uncompleted':
                if(!todoDiv.classList.contains('completed'))
                todoDiv.style.display = 'flex';
                else
                    todoDiv.style.display = 'none';
                break;
        }
    })
}
function saveTodo(inputValue){
    let inputMemory;
    // key값이 inputMemory인 배열이 없을 경우 빈 배열 생성
    if(localStorage.getItem('inputMemory')===null)
        inputMemory = [];
    else{
        // 있다면 parse메소드로 JSON 문자열을 Javascript 객체로 변환
        inputMemory = JSON.parse(localStorage.getItem('inputMemory'));
    }
    // 배열에 추가된 todoDiv li 요소의 텍스트를 추가
    inputMemory.push(inputValue);
    localStorage.setItem('inputMemory', JSON.stringify(inputMemory));
}
function getTodo(){
    let inputMemory;
    if(localStorage.getItem('inputMemory')===null)
        inputMemory = [];
    else{
        inputMemory = JSON.parse(localStorage.getItem('inputMemory'));
    }
    inputMemory.forEach(function(inputValue){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo_list');
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo_content');
        todoLi.innerText = inputValue;
        const completedButton = document.createElement('button');
        const removedButton = document.createElement('button');
        completedButton.classList.add('completed_btn');
        removedButton.classList.add('removed_btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        removedButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.append(todoLi,completedButton,removedButton);
        todo.appendChild(todoDiv);
    })
}
function removeTodo(inputValue){
    let inputMemory;
    if(localStorage.getItem('inputMemory')===null)
        inputMemory = [];
    else{
        inputMemory = JSON.parse(localStorage.getItem('inputMemory'));
    }
    // 로컬저장소 배열원소와 삭제한 todoDiv의 입력값이 같은 경우
    // 로컬저장소 저장된 배열에서 해당 원소를 제거
    inputMemory.forEach(function(Memory){
        if(Memory === inputValue){
            const index = inputMemory.indexOf(Memory);
            inputMemory.splice(index,1);
        }
    })
    localStorage.setItem('inputMemory',JSON.stringify(inputMemory));
}