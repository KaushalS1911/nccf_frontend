import React from 'react';
import img from '../../../assets/images/header/Group1.png';
import header2 from '../../../assets/images/header/header2 (1).png';
import img1 from '../../../assets/images/header/img-1.png';
import img2 from '../../../assets/images/header/img-2.png';
import img3 from '../../../assets/images/header/img-3.png';
import mobileLogo from '../../../assets/images/header/logo1@4x.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <>
      <AppBar position="fixed" color="default" sx={{ py: 0, zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, lg: 0 }, display: 'flex' }}>
          <Box px={2}>
            <Box sx={{height: {xl:"85px",xs: "80px"}}}>
              <img src={img} style={{ height: '100%' }} alt="logo" />
            </Box>
          </Box>
          <Box
            display={{ xs: 'none', lg: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            ml={2}
          >
            <Box sx={{ width: { xl: '240px', md: '220px' } }}>
              <img src={header2} style={{ width: '100%' }} alt="header2" />
            </Box>
            <Box mx={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: { xl: '140px', md: '130px' } }}>
                <img src={img1} style={{ width: '100%' }} alt="header3" />
              </Box>
              <Box sx={{ width: { xl: '140px', md: '130px' } }}>
                <img src={img2} style={{ width: '100%' }} alt="header3" />
              </Box>
              <Box sx={{ width: { xl: '310px', md: '270px' } }}>
                <img src={img3} style={{ width: '100%' }} alt="header3" />
              </Box>
            </Box>
          </Box>
          {/* <Box display={{ xs: 'block', lg: 'none' }}> */}
            {/* <IconButton edge="start" color="inherit" aria-label="menu"> */}
              {/* <MenuIcon style={{ fontSize: '30px' }} /> */}
            {/* </IconButton> */}
          {/* </Box> */}
        </Toolbar>
      </AppBar>
    </>
  );
}
