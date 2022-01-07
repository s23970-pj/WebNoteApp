(function () {
    'use strict';

    let movedElement, moveStart, move, moveEnd,
        grabPointY, grabPointX, createNote,
        init, localStgTest, loadNotes, saveNote, deleteNote,
        saveBtn, getNoteObject, delBtn, addBtnClick;

    moveStart = function (id) {
        let boundClientReact;
        if (id.target.className.indexOf('bar') === -1) {
            return;
        }

        movedElement = this;
        boundClientReact = movedElement.getBoundingClientRect();
        grabPointY = boundClientReact.top - id.clientY;
        grabPointX = boundClientReact.left - id.clientX;
    };
    move = function (id) {
        if (!movedElement) {
            return;
        }
        let posX = id.clientX + grabPointX;
        let posY = id.clientY + grabPointY;

        if (posX < 0) {
            posX = 0;
        }
        if (posY < 0) {
            posY = 0;
        }

        movedElement.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
    };

    moveEnd = function () {
        movedElement = null;
        grabPointY = null;
        grabPointX = null;
    };
    getNoteObject = function (el){
    var textarea = el.querySelector('textarea');
    return{
      content: textarea.value,
      id: el.id,
      randNoteDisplay: el.style.transform,
    };
    };
    createNote = function (options) {
        var note = document.createElement('div'),
            navBar = document.createElement('div'),
            saveBtn = document.createElement('button'),
            delBtn = document.createElement('button'),
            text = document.createElement('textarea'),
            updated = document.createElement('div'),
            saveFunc,
            delFunc,
            BOUNDARIES = 300,
            noteConfig = options || {
            content: '',
            id: "note_" + new Date().getTime(),
            randNoteDisplay: "translateX(" + Math.random() * BOUNDARIES + "px) translateY(" + Math.random() * BOUNDARIES + "px)",
            };
        delFunc = function () {
            deleteNote(getNoteObject(note));
            document.body.removeChild(note);
        };
        saveFunc = function () {
            saveNote(
                getNoteObject(note)
            );
        };
        note.id=noteConfig.id;
        text.value = noteConfig.content;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()) + ' ' + 'time' + (today.getHours()) + ':' + (today.getMinutes());
        let randNoteDisplay = noteConfig.randNoteDisplay;

        saveBtn.addEventListener('click', saveFunc);
        delBtn.addEventListener('click', delFunc);
        navBar.appendChild(saveBtn);
        navBar.appendChild(delBtn);

        saveBtn.classList.add('saveBtn');
        delBtn.classList.add('delBtn');

        note.style.transform = randNoteDisplay;
        note.classList.add('note');
        navBar.classList.add('nav_bar');
        updated.classList.add('updated');
        note.append(navBar);
        note.append(text);
        note.append(updated);
        updated.innerHTML += date;
        note.addEventListener('mousedown', moveStart, false);
        document.body.appendChild(note);

    };
    // createNote();

    localStgTest = function () {
        let wart = 'wart';
        try {
            localStorage.setItem(wart, wart);
            localStorage.removeItem(wart);
            return true;
        } catch (e) {
            return false;
        }
    };
     addBtnClick = function () {
         createNote();
     };
    init = function () {

        if (!localStgTest()) {
            var popUp = "LocalStorage Err..."
        } else {
            saveNote = function (note) {
                localStorage.setItem(note.id, note);
            };
            deleteNote = function () {

            };
            loadNotes = function () {
            };
            loadNotes();
        }

        let addBtn = document.querySelector('.add_btn');
        addBtn.addEventListener('click', addBtnClick, false);
        document.addEventListener('mousemove', move, false);
        document.addEventListener('mouseup', moveEnd, false);
      //  document.querySelector('.note').addEventListener('mousedown', moveStart, false);
    };
    init();
})();