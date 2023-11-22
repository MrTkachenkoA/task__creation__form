import React, { useState } from 'react';
import Select from 'react-select';

export const App = () => {
  const [selectedExecutor, setSelectedExecutor] = useState(
    'Ще не вибрано жодної особи...'
  );
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [file, setFile] = useState(null);

  const executorByNameOptions = [
    { label: 'Ще не вибрано жодної особи...' },
    { label: 'Паламарчук Євген Анатолійович' },
    { label: 'Севастьянов Володимир Миколайович' },
    { label: 'Хома Олег Іванович' },
  ];
  const executorByGroupOptions = [
    { value: 'Виберіть список' },
    { value: 'Декани' },
    { value: 'Завідуючі кафедрами' },
    { value: 'Ректорат' },
  ];

  const handleExecutorChange = event => {
    const selectedExecutor = event.target.value;
    setSelectedExecutor(selectedExecutor);
  };

  const handleExecutorChangeByName = selectedOption => {
    setSelectedExecutor(selectedOption.label);
  };

  const handleTaskTextChange = event => {
    const text = event.target.value;
    setTaskText(text);
  };

  const handleDueDateChange = event => {
    const date = event.target.value;
    setDueDate(date);
  };

  const handleDueTimeChange = event => {
    const time = event.target.value;
    setDueTime(time);
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSelectedExecutor('Ще не вибрано жодної особи...');
    setTaskText('');
    setDueDate('');
    setDueTime('');
    setFile(null);
    console.log(
      'Form submitted!',
      selectedExecutor,
      taskText,
      dueDate,
      dueTime,
      file
    );
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">Створити нове доручення</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <p className="p">Зі списків:</p>
          <select
            className="set"
            onChange={handleExecutorChange}
            value={selectedExecutor}
          >
            {executorByGroupOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          <p className="p">Знайти:</p>
          <Select
            className="exec"
            options={executorByNameOptions}
            value={selectedExecutor}
            onChange={handleExecutorChangeByName}
            isSearchable
            placeholder="Введіть прізвище"
          />
        </label>

        {selectedExecutor ? (
          selectedExecutor.label ? (
            <label className="label">
              <p className="p">Виконавці: </p>
              <p className="nobody">{selectedExecutor.label}</p>
            </label>
          ) : (
            <label className="label">
              <p className="p">Виконавці: </p>
              <p className="nobody">{selectedExecutor}</p>
            </label>
          )
        ) : (
          <label className="label">
            <p className="p">Виконавці: </p>
            <p className="nobody">{selectedExecutor}</p>
          </label>
        )}

        <label className="label">
          <p className="p">Доручення:</p>
          <textarea
            className="text"
            value={taskText}
            onChange={handleTaskTextChange}
            placeholder="Напишіть тут зміст"
          />
        </label>

        <label className="label">
          <p className="p">Виконати до:</p>
          <input className="set" type="date" onChange={handleDueDateChange} />
        </label>

        <label className="label">
          <p className="p">*Терміново до:</p>
          <input className="set" type="time" onChange={handleDueTimeChange} />
        </label>

        <label className="label">
          <p className="p">Додати файл:</p>
          <input type="file" onChange={handleFileChange} />
        </label>

        <button className="btn" type="submit">
          Створити доручення
        </button>
      </form>
    </div>
  );
};
