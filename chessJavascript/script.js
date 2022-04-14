// Creating a text introduction, a 'div' element: head_text
// the 'div' is a parent element of 'h1':firstLine
// and 'h2':secondLine
let head_text = document.createElement('div');
let firstLine = document.createElement('h1');
firstLine.innerHTML = "Hello!"
let secondLine = document.createElement('h2');
secondLine.innerHTML = "My name is Tal 👋"
// Appending head_text its' children elements
head_text.appendChild(firstLine);
head_text.appendChild(secondLine);

// Creating a new table element inside the variable 'table'
let table = document.createElement('table');

// Using a 'for' loop to achieve 8 columns, 8 rows
// with minimum code lines
for(let j = 0; j<8; j++){
    let temp_row = document.createElement('tr');
    table.appendChild(temp_row);
    for(let i = 1; i<9; i++){
        let temp_td = document.createElement('td');
        temp_td.innerHTML = "";
        temp_row.appendChild(temp_td);
        }
}

let end_text = document.createElement('div');
let end_text_1 = document.createElement('h1');
end_text_1.innerHTML = "Let's play a game...";
let end_text_2 = document.createElement('h2');
end_text_2.innerHTML = "of Chess.";
let end_text_3 = document.createElement('h2');
end_text_3.innerHTML = "♟️";
end_text.appendChild(end_text_1);
end_text.appendChild(end_text_2);
end_text.appendChild(end_text_3);

// Appending the HTML 'body' elements with its' children elements
// Appending the children with the required hierarchy 
document.getElementById('body').appendChild(head_text);
document.getElementById('body').appendChild(table);
document.getElementById('body').appendChild(end_text);