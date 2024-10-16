import {useEffect, useState} from 'react'
import './App.css'
import Confetti from 'react-confetti'
const maxValue = 30;
const minValue = 1;

function App() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isExploding, setIsExploding] = useState(false);
    const [recycle,setRecycle] = useState(true);

    const validateInput = () => {
        const cyrillicRegex = /[аебийклмнопрстуфхцчшщ]/i;
        const latinRegex = /[a-zA-Z]/;
        const hasCyrillic = cyrillicRegex.test(inputValue);
        const hasLatin = latinRegex.test(inputValue);

        if (inputValue.length > 0 && !messages.includes('Проверенно обычное значение.')) {
            setMessages((prev)=>[...prev,'Проверенно обычное значение.']);
            return;
        }

        if (inputValue.length > maxValue && !messages.includes(`Проверенно максимальное значение.`)) {
            setMessages((prev)=>[...prev,`Проверенно максимальное значение.`]);
            return;
        }

        if (inputValue.length < minValue && !messages.includes(`Проверенно минимальное значение.`)) {
            setMessages((prev)=>[...prev,`Проверенно минимальное значение.`]);
            return;
        }

        if (inputValue.trim() === '' && !messages.includes('Проверенно пустое значение.')) {
            setMessages((prev)=>[...prev,'Проверенно пустое значение.']);
            return;
        }

        if (inputValue.length > minValue && inputValue.length < maxValue && !messages.includes('Проверенно граничное значение.')) {
            setMessages((prev)=>[...prev,'Проверенно граничное значение.']);
            return;
        }

        if (inputValue.length > 0 && !/[a-zA-Z]/.test(inputValue) && !/[аебийклмнопрстуфхцчшщ]/i.test(inputValue) && !messages.includes('Проверенны не буквы.')) {
            setMessages((prev)=>[...prev,'Проверенны не буквы.']);
            return;
        }

        if (hasCyrillic && hasLatin && !messages.includes('Проверенно смесь языков.')) {
            setMessages((prev)=>[...prev,'Проверенно смесь языков.']);
            return;
        }

        if (/\s/.test(inputValue) && !messages.includes('Проверенны пробелы в словах.')) {
            setMessages((prev)=>[...prev,'Проверенны пробелы в словах.']);
            return;
        }

        if (inputValue.length > 0 && /^\s*$/.test(inputValue) && !messages.includes('Проверенны только пробелы.')) {
            setMessages((prev)=>[...prev,'Проверенны только пробелы.']);
            return;
        }

        navigator.clipboard.readText().then((copiedValue)=>{
            console.log(inputValue,copiedValue)
            if(inputValue === copiedValue && !messages.includes('Проверенна вставка.')) {
                setMessages((prev)=>[...prev,'Проверенна вставка.'])
            }
        })
    };

    const onSubmit = (event:any) => {
        event.preventDefault();
        validateInput();
    };

    useEffect(()=>{
        if(messages.length===10){
            setIsExploding(true)
        }
    },[messages])

    useEffect(()=>{
        if(isExploding){
            setTimeout(()=>{
                setRecycle(false)
            },5000)
        }
    },[isExploding])

  return (
    <div>
        <h1>MODSEN</h1>
        <h2>TEST CHALLENGE</h2>
        <div className='warningDiv'>
            <p>Что нужно сделать</p>
            <span>Определите все тесты, необходимые для приведенного ниже сценария. На основе данных, введенных в поле, будут оцениваться тесты.</span>
            <p>Что не следует тестировать</p>
            <span>Разные браузеры, очень большие запросы, «неприятные слова», увеличение и уменьшение масштаба браузера. Не используйте средства автоматизации. Нельзя отключать стандартное API браузера для корректной работы приложения.</span>
            <p>Спецификация</p>
            <span>Пользователь должен заполнить необходимые данные для получения доступа, как обычный пользователь на форуме. Максимальная длина поля - 30.</span>
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <label className='inputLabel'>
                    <span style={{fontWeight:600,fontSize:'12px'}}>Поле ввода</span>
                    <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
                </label>
                <button disabled={isExploding} type='submit'>Отправить</button>
            </form>
            <div>
                <p>Проверенно случаев: <span style={{color:messages.length > 0?'green':'white'}}>{messages.length}</span> из 10</p>
                {messages.length > 0 && (
                    <div className="messages">
                        {messages.map((message, index) => (
                            <span key={index}>{message}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {isExploding && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={recycle} />}
    </div>
  )
}

export default App
