let dt = new Date();
let year_dt = dt.getFullYear();
let month_dt = dt.getMonth();
let date_dt = dt.getDate();
const month = ['January', 'Februay', 'Merch', 'April', 'May', 'June', 'June', 'August', 'September', 'October', 'November', 'December'];
let tbody = document.querySelector('tbody');
let id;
window.onload = initialize();

function initialize() {
    getCalendar();
    add_EventListener();
}

function getCalendar() {
    tbody.innerHTML = '';
    set_yearMonth();
    printCalendar();
    getStorage();
}
function printCalendar() {
    let date = 1;
    let template = document.getElementById('date');
    for (let i = 0; i < 6; i++) {
        let cloneContent = template.content.cloneNode(true);
        let tds = cloneContent.querySelectorAll('td');

        tds.forEach((element, index) => {
            let this_year = new Date(year_dt, month_dt, 1).getFullYear();
            let this_month = new Date(year_dt, month_dt, 1).getMonth();
            let first_day_dt = new Date(year_dt, month_dt, 1).getDay();
            let first_dt = new Date(year_dt, month_dt, date).getDate();
            let last_month = new Date(year_dt, month_dt - 1, 1).getMonth();
            let lastMonth_dt = new Date(year_dt, month_dt, 0).getDate();
            let lastMonth_day_dt = new Date(year_dt, month_dt, 0).getDay();
            let next_month = new Date(year_dt, month_dt + 1, 1).getMonth();
            let nextMonth_dt = new Date(year_dt, month_dt + 1, 0).getDate();
            let lastMonth_date = lastMonth_dt + (index - lastMonth_day_dt);
            if (i == 0) {
                if (first_day_dt <= index) {
                    element.textContent = first_dt;
                    element.style.backgroundColor = '#7c7';
                    element.id = this_year + '/' + this_month + '/' + first_dt;
                    date++;
                }
                else {
                    element.textContent = lastMonth_date;
                    element.id = this_year + '/' + last_month + '/' + lastMonth_date;
                }
            }
            else if (date <= nextMonth_dt) {
                element.textContent = first_dt;
                element.style.backgroundColor = '#7c7';
                element.id = this_year + '/' + this_month + '/' + first_dt;
                date++;
            }
            else {
                element.textContent = first_dt;
                element.id = this_year + '/' + next_month + '/' + first_dt;
                date++;
            }
        });
        tbody.appendChild(cloneContent);

    }
    let tbody_tds = document.querySelectorAll('tbody td');

    tbody_tds.forEach(element => {
        element.addEventListener('click', setModal, false);
    });
}
function set_yearMonth() {
    let yearMonth = document.getElementById('Month');
    let month_title = new Date(year_dt, month_dt, 1).getMonth();
    let year_title = new Date(year_dt, month_dt, 1).getFullYear();
    yearMonth.textContent = `${year_title}` + ' ' + month[month_title];
}
function add_EventListener() {
    let btn_left = document.getElementById('left');
    let btn_right = document.getElementById('right');
    btn_left.addEventListener('click', reduce_1, false);
    btn_right.addEventListener('click', add_1, false);
}
function reduce_1() {
    month_dt--;
    getCalendar();
}
function add_1() {
    month_dt++;
    getCalendar();
}
function setModal() {
    id = event.target.id;
    event.target.setAttribute('data-toggle', 'modal');
    event.target.setAttribute('data-target', '#myModal');
    let btn_save = document.querySelector('#save');
    btn_save.addEventListener('click', clickSave, false);
}
function clickSave() {
    let things = document.querySelector('#things-name').value;

    let _temp = {
        'id': id,
        'things': things
    }
    let uuid = _uuid();
    localStorage.setItem(`${uuid}`, JSON.stringify(_temp));

    getCalendar();
}
function getStorage() {
    if (localStorage.length != 0) {
        for (let k = 0; k < localStorage.length; k++) {
            let storage = localStorage.getItem(`${localStorage.key(k)}`);
            let temp = JSON.parse(storage);
            let div = document.createElement('div');
            div.id = localStorage.key(k);
            div.innerHTML = temp.things;

            let target = document.getElementById(`${temp.id}`);
            div.addEventListener('click', Remove, false);
            if (target != null)
                target.appendChild(div);
        }
    }
}
let modify_key;
function Remove() {
    modify_id = localStorage.getItem(event.target.id);
    modify_key = event.target.id;
    JSON.parse(modify_id);
    localStorage.removeItem(modify_key);
    getCalendar();
    event.stopPropagation();
}
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}