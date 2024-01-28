import { useEffect, useState } from 'react';
import './assets/main.css';
import ElmaramLogo from './assets/maram.jpg';

function App() {
  const [inputName, setInputName] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [dataFetching, setDataFetching] = useState([]);
  const [nameOutput, setNameOutput] = useState('');

  // Consider using a more descriptive variable name for the API endpoint
  const apiEndpoint = 'https://pharmacy-api-5i0h.onrender.com/api/v1/users';

  const handleAdd = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          name: inputName,
          address: inputAddress,
          phone: inputPhone
        })
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        window.location.reload();
        // Consider using React state to update data instead of reloading the page
        // Update state to include the new data without a page reload
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetch(`${apiEndpoint}?fields=-password`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDataFetching(Array.isArray(json) ? json : []); // Ensure json is an array
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []);

  let handleSearchBar = async (value) => {
    try {
      const response = await fetch(
        `${apiEndpoint}?sort=createdAt${value !== '' && `&keyword=${value}`} `
      );

      if (response.ok) {
        const json = await response.json();
        setNameOutput(json);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


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
              <button
                onClick={() => {
                  fetch(`${apiEndpoint}/${info.id}`, {
                    method: 'DELETE'
                  });
                }}
                className="btn"
              >
                حذف
              </button>
              {console.log(info.id)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
