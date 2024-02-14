
import './App.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
name:{
  first:string;
  last:string;
}
email:string;
}
const UserPage = () => {
  const [userData, setUserData] = useState <UserData|null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
    try{
      const response = await axios.get('https://randomuser.me/api')
      const {name,email}=response.data.results[0]
      console.log(name,email)
      setUserData({
        name:{
          first:name.first,
          last:name.last
        },
        email:email
      })
      localStorage.setItem('userData',JSON.stringify(userData))
    }
    catch(error){
      console.log('error in fetching',error)
    }
  }
    const cachedUserData = localStorage.getItem('userData');
    if (cachedUserData) {
      setUserData(JSON.parse(cachedUserData));
    } else {
      fetchUserData();
    }
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { name, email } = response.data.results[0];
      setUserData({
        name:{
          first:name.first,
          last:name.last
        },
        email:email
      });
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>User Information</h1>
      {userData && (
        <div>
          <p><strong>Name:</strong> {`${userData.name.first } ${userData.name.last}`}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default UserPage;
