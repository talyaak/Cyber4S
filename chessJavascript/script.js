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
for(let j = 1; j<9; j++){
    let temp_row = document.createElement('tr');
    table.appendChild(temp_row);
    for(let i = 1; i<9; i++){
        let temp_td = document.createElement('td');
        temp_td.innerHTML = "";
        // the next if/if else statements will help us assign the Chessboard
        // pieces, each piece to its' location, using Unicode
        // first row:
        if (j == 1 && i == 1) { temp_td.innerHTML = "&#9820";}
        else if (j == 1 && i == 2) { temp_td.innerHTML = "&#9822";}
        else if (j == 1 && i == 3) { temp_td.innerHTML = "&#9821";}
        else if (j == 1 && i == 4) { temp_td.innerHTML = "&#9819";}
        else if (j == 1 && i == 5) { temp_td.innerHTML = "&#9818";}
        else if (j == 1 && i == 6) { temp_td.innerHTML = "&#9821";}
        else if (j == 1 && i == 7) { temp_td.innerHTML = "&#9822";}
        else if (j == 1 && i == 8) { temp_td.innerHTML = "&#9820";}
        // second row:
        else if (j == 2) { temp_td.innerHTML = "&#9823";}
        // seventh row:
        else if (j == 7) { temp_td.innerHTML = "&#9817";}
        // eighth row:
        else if (j == 8 && i == 1) { temp_td.innerHTML = "&#9814";}
        else if (j == 8 && i == 2) { temp_td.innerHTML = "&#9816";}
        else if (j == 8 && i == 3) { temp_td.innerHTML = "&#9815";}
        else if (j == 8 && i == 4) { temp_td.innerHTML = "&#9813";}
        else if (j == 8 && i == 5) { temp_td.innerHTML = "&#9812";}
        else if (j == 8 && i == 6) { temp_td.innerHTML = "&#9815";}
        else if (j == 8 && i == 7) { temp_td.innerHTML = "&#9816";}
        else if (j == 8 && i == 8) { temp_td.innerHTML = "&#9814";}
        temp_row.appendChild(temp_td);
        }
}
// Creating a text 'outro', a 'div' element: end_text
// the 'div' is a parent element of 'h1':end_text_1
// and 'h2':end_text_2, 'h2':end_text_3
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