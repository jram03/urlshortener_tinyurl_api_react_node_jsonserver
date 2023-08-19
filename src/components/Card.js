import React from 'react'

export default function Card({element,deletehandler}) {
  return (
    <>
            <td className='longtd'>
            {element.long_url}
            </td>
            <td className='shorttd'><a href={element.short_url}>
            {element.short_url}</a>
            </td>
            <td>
                <button className='delete' onClick={()=>{deletehandler(element.id)}}>delete</button>
            </td>
    </>
  )
}
