


import React, { useState, useEffect } from 'react'
import userImage from '../../images/user.webp'
import { auth, db } from '../../firebase/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AppButton from '../../components/button/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { GetLoginUsersDataAction } from '../../store/actions/TransportActions';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const user = localStorage.getItem("uid");
    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    })



    const login = (e) => {
        e.preventDefault()


        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('uid', user.uid)

                const email = user.email
                const uid = user.uid
                const createdAt = user.metadata.createdAt
                const creationTime = user.metadata.creationTime
                const lastLoginAt = user.metadata.lastLoginAt
                const lastSignInTime = user.metadata.lastSignInTime

                const data = {
                    email,
                    uid,
                    createdAt,
                    creationTime,
                    lastLoginAt,
                    lastSignInTime
                }

                if (email !== '' && password !== '') {
                    await setDoc(doc(db, "Sign In Data", user.uid), data);
                    navigate('/home')
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (email === '' || password === '') {
                    alert('Please fill out all the fields')
                }
                else {
                    console.log('sign in error', errorMessage);
                    alert(errorMessage)
                }
            });
    }

    return (
        <div className='form-container'>
            <img src={userImage} />
            <form onSubmit={login}>
                <h1>Login</h1>
                <Box sx={{ mb: 2 }}>
                    <TextField onChange={(e) => setEmail(e.target.value)} type="email"
                        fullWidth label="Email" placeholder="Enter email" />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <TextField onChange={(e) => setPassword(e.target.value)} type="password"
                        fullWidth label="Password" placeholder="Enter password" />
                </Box>

                <Box className='btn-container'>
                    <AppButton name="Login" variant="contained" btnAction={login} />
                    <Link to="/signup">Sign up</Link>
                </Box>

            </form>
        </div>

    )
}

export default Login



