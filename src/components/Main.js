import React from 'react'
import { useState } from 'react'
import api from './api'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
function Main({hdata,sethdata}) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shorturl, setShortUrl] = useState('');
    const [cpy_status,setcpystatus] = useState('copy');

    const formHandler = async (event) =>{
        event.preventDefault();
        try {
            console.log("ori url : "+originalUrl);
        const response =await axios.post('http://localhost:4000/create',{url: originalUrl}).then((res)=>{
            console.log(res.data);
            setShortUrl(res.data.data.tiny_url);
            let newid=uuidv4();
            sethdata([...hdata,{id:newid ,"long_url": originalUrl, "short_url":res.data.data.tiny_url }]);
            const form2handle = async(event1) => {
            try{
                const response1=await axios.post('http://localhost:3005/history',{id:newid ,"long_url": originalUrl, "short_url":res.data.data.tiny_url })
                
            }
            catch(err){

            }
        }
        form2handle();


        });

        // setShortUrl(response);
        // console.log("response" + response)
        }
        catch(e){
            console.log("hiiii")
        }



    }
    const copyhandler =() =>{
        navigator.clipboard.writeText(shorturl);
        setcpystatus('copied');
        document.getElementById('btn2').style.backgroundColor='rgba(128, 128, 128, 0.336) ';
        document.getElementById('btn2').style.borderColor='rgba(128, 128, 128, 0.336) ';
        document.getElementById('btn2').style.color = 'black';
        document.getElementById('btn2').disabled = true;
        
        const timer=setTimeout(()=>{
                setcpystatus('copy');
                document.getElementById('btn2').style.backgroundColor='#337ab7';
                document.getElementById('btn2').style.borderColor='#2e6da4';
                document.getElementById('btn2').style.color='#fff';
                document.getElementById('btn2').disabled = false;


            },2000);
            
    }
    
    

   
  return (
    <div className='container'>
        <form onSubmit={formHandler}>
            <div className='box'>
            <input id='inpurl' type="text" value={originalUrl} onChange={(e)=>{setOriginalUrl(e.target.value)}}/>
            <button id='btn1' type='submit'>Shorten</button>
            </div>
        </form>
        <p id='shorturl'>{shorturl}</p>
        <button id='btn2' onClick={ copyhandler }>{cpy_status}</button>
    </div>
  )
}

export default Main;