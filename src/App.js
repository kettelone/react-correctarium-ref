import moment from 'moment/moment.js'
import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react'
import {finalResult} from './calculate'
import {Select} from './select.js'

const language = {
  ua: 'Украинский',
  ru: 'Русский',
  en: 'Английский',
  eng: 'Английский(носитель)'
}

const serviceType = {
  перевод: 'Перевод',
  редактированние:'Редактированние'
}


function App(props){
  const [ln, setLn] = useState('');
  const [text, setText] = useState('');
  const [price, setPrice] = useState('0')
  const [date, setDate] = useState(' ')
  const [email, setEmail] = useState(' ');
  const [comment, setComment] = useState(' ');
  const [name, setName] = useState(' ');
  const [service,setService]=useState(' ');
  const format = 'doc'

   function handleLn(e){
    setLn(e.target.value)
  }

  function handleText(e){
    setText(e.target.value)
  }

  function handleOrder(){
    console.log(email,comment, name, service)
  }

  useEffect(()=>{
    if(text && ln){
      let result = finalResult(text.length, ln, format)
      setPrice(result[0]);
      setDate(moment(result[1]).format('LLLL'))
    }else{
      setPrice(0);
      setDate('')
    }
  }, [text, ln] );


  return(
    <div className="wrapper">

         <h1>Заказать услугу или редактирование</h1>
           <div onClick={(e) => setService(e.target.service)}> 
              <select selected  className="customSelect" id="inputGroupSelect04">
                <option value="" selected disabled hidden>Услуга</option>
                {
                    Object.keys(serviceType).map(function(keyName) {
                      let keyValue  = serviceType[keyName]
                      return <Select name={{keyName, keyValue}} />
                    })
                }
                </select>
            </div>

        <div className="sameLine1">
          <div className="input">
                <input type="text" placeholder="Вставьте текст или" className="textInput" onChange={(e) => handleText(e)}/>
          </div>
          <div id="finalWindow">
              <div id="content_price">
                  <div id="number">
                   {price}
                   <span className="currency">грн</span>
                  </div>
                  <div id="deadline">
                  {date}
                  </div>
              </div>

            <div id="orderButton">
                  <button type="button" className="customButton" onClick={handleOrder}>Заказать</button>
            </div>
           </div>
        </div>

        <div className="upload">
            <input type="file" placeholder="Загрузите файл" />
        </div>
       

        <div className="sameLine">

            <div id="email" className="inputInfo">
              <input type="text" 
              className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Ваша эл. почта"
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="name" className="inputInfo">
              <input type="text" 
              className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  placeholder="Ваша имя"
              onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div id="comment" className="inputInfo">
              <input type="text" 
              className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  placeholder="Комментарий к заказу или ссылка"
              onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div id="language" className="inputInfo" onChange={(e) => handleLn(e)}>
              <select className="customSelect">  
                <option value="" selected disabled hidden>Язык</option>
                {
                    Object.keys(language).map(function(keyName) {
                      let keyValue  = language[keyName]
                      return <Select name={{keyName, keyValue}} />
                    })
                }
              </select>
          </div>
        </div>
      </div>
  )
}

export default App;