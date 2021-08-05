import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './style.css';

export default function App() {
  const currentStorage = JSON.parse(localStorage.getItem('Tasks'));
  //console.log(currentStorage);
  const tasks = () => {
    if (currentStorage) {
      return currentStorage;
    } else {
      return ['Marcos', 'Gustavo', 'Matheus', 'Luana'];
    }
  };
  const [taskList, setTaskList] = useState(tasks);
  const [currentItem, setCurrentItem] = useState('');

  const logNewItem = e => {
    setCurrentItem(e.target.value);
  };

  console.log(`fora: ${currentItem}`);
  const save = useCallback(
    e => {
      e.preventDefault();
      if (currentItem) {
        //console.log(`dentro: ${currentItem}`);
        setTaskList([...taskList, currentItem]);
        setCurrentItem('');
      }
    },
    [currentItem]
  );

  const deleteItem = e => {
    //find index
    const searchParam = e.target.name;
    const deleteFilter = p => p == searchParam;
    const thisIndex = taskList.findIndex(deleteFilter);
    //console.log(thisIndex);
    const newArr = [...taskList];
    newArr.splice(thisIndex, 1);
    setTaskList(newArr);
  };
  //save on localstorage
  const saveOnLocalStorage = () => {
    localStorage.setItem('Tasks', JSON.stringify(taskList));
  };
  useEffect(() => {
    saveOnLocalStorage();
  }, [taskList]);

  const numberofTasks = useMemo(() => taskList.length, [taskList]);

  return (
    <div className="main">
      <div className="tasklist">
        <h1>Lista de alunos</h1>
        <p>Alunos na lista: {numberofTasks}</p>
        <ul>
          {taskList.map((task, i) => (
            <li key={i}>
              {task}{' '}
              <button
                className="button"
                name={task}
                onClick={e => {
                  deleteItem(e);
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form>
          <input
            type="text"
            value={currentItem}
            onChange={e => {
              logNewItem(e);
            }}
          />
          <input
            type="submit"
            className="button"
            value="Salvar"
            onClick={e => {
              save(e);
            }}
          />
        </form>
      </div>
    </div>
  );
}
