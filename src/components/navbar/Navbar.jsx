



import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { useSelector } from 'react-redux';




function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()
    const settings = [
        {
            name: 'Profile', func: () => {
                navigate('/profile')
            }
        },
        {
            name: 'Booking History', func: () => {
                navigate('/bookinghistory')
            }
        },
        {
            name: 'Payment', func: () => {
                navigate('/payment')
            }
        },
        {
            name: 'Logout', func: () => {
                localStorage.removeItem('uid')
                navigate('/')
            }
        },
    ];

    const [profileImage, setProfileImage] = useState()
    useEffect(() => {
        const userUid = localStorage.getItem('uid')
        // User profile 
        onSnapshot(doc(db, "Users Profile Images", userUid), (doc) => {
            setProfileImage(doc.data() ? doc.data().url : null)
        });
    }, [])



    const { role } = useSelector(state => {
        return state.GetLoginUsersDataReducer
    })
    const userUid = localStorage.getItem('uid')

    let pages;
    if (userUid === "zMSWLwPkGrg1ddW65JDxUUD0sax1" || role === 'Transporter') {
        pages = [
            { name: 'Home', href: '/' },
            { name: 'Post', href: '/post' },
        ];
    }
    else {
        pages = [
            { name: 'Home', href: '/' },
            { name: 'Booking History', href: '/bookinghistory' },
        ]
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            // Targetting child of typogrphy i.e link (anchor)
                            a: {
                                textDecoration: 'none',
                                color: 'white'
                            }
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{ a: { textDecoration: 'none', color: 'black' } }}>
                                        <Link to={page.href}>{page.name}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            a: {
                                textDecoration: 'none',
                                color: 'white'
                            }
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block',
                                    a: { textDecoration: 'none', color: 'white' }
                                }}

                            >
                                <Link to={page.href}>{page.name}</Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={profileImage ? profileImage : null} />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, i) => (
                                <MenuItem key={i} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={setting.func}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;




