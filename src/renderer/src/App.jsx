import { useEffect, useState } from 'react'
import './assets/main.css'
import ElmaramLogo from './assets/maram.jpg'

function App() {
  const [inputName, setInputName] = useState('')
  const [inputAddress, setInputAddress] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [dataFetching, setDataFetching] = useState([])

  const api = 'https://pharmacy-api-5i0h.onrender.com/api/v1/users'

  const handleAdd = async () => {
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          name: inputName,
          address: inputAddress,
          phone: inputPhone
        })
      })

      if (response.ok) {
        const json = await response.json()
        console.log(json)
        window.location.reload()
        // Perform any additional actions if needed
      } else {
        console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    fetch(`https://pharmacy-api-5i0h.onrender.com/api/v1/users?fields=-_id,-password`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setDataFetching(Array.isArray(json) ? json : []) // Ensure json is an array
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }, [])

  let handleDelete = async () => {
    try {
      const response = await fetch(
        `https://pharmacy-api-5i0h.onrender.com/api/v1/users?page=2&limit=5&sort=name&keyword=${inputName}`,
        {
          method: 'DELETE'
        }
      )

      if (response.ok) {
        console.log('Deletion successful')
        // Perform any additional actions if needed
      } else {
        console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  let handleSearchBar = async (value) => {
    try {
      const response = await fetch(
        `https://pharmacy-api-5i0h.onrender.com/api/v1/users?page=2&limit=5&sort=name&keyword=${value}`
      )

      if (response.ok) {
        const json = await response.json()
        setDataFetching(Array.isArray(json) ? json : [])
      } else {
        console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  return (
    <>
      <div className="parent">
        <div className="leftParent">
          <input
            onChange={(e) => handleSearchBar(e.target.value)}
            className="searchBar"
            placeholder="بحث"
            type="text"
          />
          <img className="logo" src={ElmaramLogo} alt="logo" />
          {dataFetching.map((info, index) => (
            <div key={index}>
              <div>Name: {info.name}</div>
              <div>Address: {info.address}</div>
              <div>Phone: {info.phone}</div>
            </div>
          ))}
        </div>
        <div className="rightParent">
          <input
            dir="rtl"
            type="text"
            placeholder="الاسم"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            dir="rtl"
            type="text"
            placeholder="الرقم"
            value={inputPhone}
            onChange={(e) => setInputPhone(e.target.value)}
          />
          <input
            dir="rtl"
            type="text"
            placeholder="العنوان"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          />
          <div className="btnBar">
            <button className="btn" onClick={handleAdd}>
              اضافه
            </button>
            <button onClick={handleDelete} className="btn">
              حذف
            </button>
            <button className="btn">تعديل</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
