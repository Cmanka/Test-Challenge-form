import { useState } from 'react'
import './App.css'

const maxValue = 30;
const minValue = 1;

function App() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const validateInput = () => {
        const cyrillicRegex = /[аебийклмнопрстуфхцчшщ]/i;
        const latinRegex = /[a-zA-Z]/;
        const hasCyrillic = cyrillicRegex.test(inputValue);
        const hasLatin = latinRegex.test(inputValue);

        if (inputValue.length > 0 && !messages.includes('Обычное значение.')) {
            setMessages((prev)=>[...prev,'Обычное значение.']);
        }

        if (inputValue.length > maxValue && !messages.includes(`Проверенно максимальное значение: ${maxValue}.`)) {
            setMessages((prev)=>[...prev,`Проверенно максимальное значение: ${maxValue}.`]);
        }

        if (inputValue.length < minValue && !messages.includes(`Проверенно минимальное значение ${minValue}.`)) {
            setMessages((prev)=>[...prev,`Проверенно минимальное значение ${minValue}.`]);
        }

        if (inputValue.trim() === '' && !messages.includes('Пустое значение.')) {
            setMessages((prev)=>[...prev,'Пустое значение.']);
        }

        if (inputValue.length > minValue && inputValue.length < maxValue && !messages.includes('Граничное значение допустимо.')) {
            setMessages((prev)=>[...prev,'Граничное значение допустимо.']);
        }

        if (!/^\d+$/.test(inputValue) && !messages.includes('Не буквы.')) {
            setMessages((prev)=>[...prev,'Не буквы.']);
        }

        if (hasCyrillic && hasLatin && !messages.includes('Проверенно смесь языков.')) {
            setMessages((prev)=>[...prev,'Проверенно смесь языков.']);
        }

        if (/\s/.test(inputValue) && !messages.includes('Проверенны пробелы в словах')) {
            setMessages((prev)=>[...prev,'Проверенны пробелы в словах']);
        }

        if (inputValue.length > 0 && /^\s*$/.test(inputValue) && !messages.includes('Проверенны только пробелы')) {
            setMessages((prev)=>[...prev,'Проверенны только пробелы']);
        }

        navigator.clipboard.readText().then((copiedValue)=>{
            if(inputValue === copiedValue && !messages.includes('Проверенна вставка')) {
                setMessages((prev)=>[...prev,'Проверенна вставка'])
            }
        })
    };

    const onSubmit = (event:any) => {
        event.preventDefault();
        validateInput();
    };

  return (
    <div>
        <form onSubmit={onSubmit}>
            <label className='inputLabel'>
                <span>Текстовое поле</span>
                <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
            </label>
            <button type='submit'>Отправить</button>
        </form>
        <div id="messages">
            <p>Проверенно случаев: {messages.length} из 10</p>
            {messages.length > 0 && (
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    {messages.map((message, index) => (
                        <span key={index}>{message}</span>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default App
