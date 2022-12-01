


import { Avatar, Box, Typography, Button } from '@mui/material'
import { db, storage } from '../../firebase/Firebase';
import { useEffect, useState } from 'react';
import { doc, setDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ResponsiveAppBar from '../../components/navbar/Navbar';



const Profile = () => {
    const [data, setData] = useState('')
    const [selectedImage, setSelectedImage] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const userUid = localStorage.getItem('uid')
    // uploading and getting image from firebase storage and adding profile url and uid to firestore  
    const uploadAndGetImage = () => {
        const storageRef = ref(storage, `Images/Users Profile Images/${userUid}/${selectedImage.name}`);
        uploadBytes(storageRef, selectedImage).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            return getDownloadURL(snapshot.ref).then(async (url) => {
                await setDoc(doc(db, "Users Profile Images", userUid), {
                    uid: userUid,
                    url,
                });
            })
        });
    }


    useEffect(() => {
        const getUserData = async () => {
            // User Data 
            const q = query(collection(db, "Sign Up Data"), where("uid", "==", userUid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setData(doc.data())
            });

            // User profile 
            onSnapshot(doc(db, "Users Profile Images", userUid), (doc) => {
                setProfileImage(doc.data() ? doc.data().url : null)
            });
        }
        getUserData()
    }, [])


    return (

        <Box>
            <ResponsiveAppBar />
            <Box sx={{ m: '20px' }}>

                <Avatar
                    src={profileImage}
                    sx={{
                        width: 200, height: 200,
                    }}
                />

                <Box sx={{ mt: 2 }}>
                    <input type="file" accept="image/png, image/jpeg"
                        onChange={(e) => setSelectedImage(e.target.files[0])} />
                    <Button disabled={selectedImage ? false : true}
                        onClick={uploadAndGetImage} variant="contained">
                        {profileImage ? 'Update Profile' : 'Upload Profile'}</Button>
                </Box>

                {data ?
                    <Box mt={2}>
                        <Typography variant='subtitle1'> First Name: {data ? data.firstname : 'First Name'}  </Typography>
                        <Typography variant='subtitle1'> Last Name:  {data ? data.lastname : 'Last Name'} </Typography>
                        <Typography variant='subtitle1'> Phone: {data ? data.number : 'Number'} </Typography>
                        <Typography variant='subtitle1'> Email: {data ? data.email : 'Email'} </Typography>
                        <Typography variant='subtitle1'> Country: {data ? data.country : 'Country'} </Typography>
                        <Typography variant='subtitle1'> Role: {data ? data.role : 'Role'} </Typography>
                    </Box>
                    :
                    <Stack spacing={1} mt={3}>
                        <Skeleton variant="rectangular" width={200} height={30} />
                        <Skeleton variant="rectangular" width={200} height={30} />
                        <Skeleton variant="rectangular" width={200} height={30} />
                        <Skeleton variant="rectangular" width={200} height={30} />
                        <Skeleton variant="rectangular" width={200} height={30} />
                        <Skeleton variant="rectangular" width={200} height={30} />
                    </Stack>
                }
            </Box>

        </Box>

    )
}

export default Profile

