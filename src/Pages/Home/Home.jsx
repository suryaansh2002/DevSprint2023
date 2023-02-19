import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import Sidenav from '../../Components/SideNav/Sidenav';
import './Home.css'
export default function Home() {
    const [articles, setArticles] = useState([])
    var url = 'https://newsdata.io/api/1/news?apikey=pub_1749158b4447894e481fefd089da75e713eda'
    
    var url2='https://newsdata.io/api/1/news?apikey=pub_1749158b4447894e481fefd089da75e713eda&page=16767944382f68b51653791e2e6020068f413d764f'
    var nextpage;
    useEffect(() => {
        axios.get(url2 + '&language=en').then((res) => {
            console.log(res.data)
            const arr=[]
            res.data.results.map((item)=>{
                if(item.image_url){
                    arr.push(item)
                }
            })
            nextpage=res.data.nextpage;
            url2=url+'&page='+nextpage;
            if(arr.length<15){
                  axios.get(url2 + '&language=en').then((response) => {
                    response.data.results.map((item)=>{
                        if(item.image_url){
                            arr.push(item)
                        }
                    })
                    nextpage=res.data.nextpage;
                    url2=url+'&page='+nextpage; 
                    console.log(arr)   
                    if(arr.length<15){
                        axios.get(url2 + '&language=en').then((response2) => {
                          response2.data.results.map((item)=>{
                              if(item.image_url){
                                  arr.push(item)
                              }
                          })
                          nextpage=res.data.nextpage;
                          url2=url+'&page='+nextpage;
                    console.log(arr)   

                          if(arr.length<15){
                            axios.get(url2 + '&language=en').then((response3) => {
                              response3.data.results.map((item)=>{
                                  if(item.image_url){
                                      arr.push(item)
                                  }
                              })
                              nextpage=res.data.nextpage;
                              url2=url+'&page='+nextpage;    
                              if(arr.length<15){
                                axios.get(url2 + '&language=en').then((response4) => {
                                  response4.data.results.map((item)=>{
                                      if(item.image_url){
                                          arr.push(item)
                                      }
                                  })
                                  nextpage=res.data.nextpage;
                                  url2=url+'&page='+nextpage;                                
                              })
                              console.log(arr)
                          }
                                          
                          })
                          console.log(arr)
                      }
                                          
                      })
                      console.log(arr)
                  }
                                  
                })
                console.log(arr)
            }
      setArticles(arr)
        })
    }, [])
    return (
        <div className='home-container'>
            <div className='sidenav'>
                <div>Filter By:</div>

            </div>
            <div className='home-main'>
                {
                    articles.length>0 && articles.map((item) => (<div className='news-card'>
                        <div>
                            <img src={item.image_url} className='news-img'/>
                        </div>
                        <div>{item.title}</div>
                    </div>)
                    )
                }
            </div>
        </div>

    )
}
