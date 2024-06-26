import React from 'react'
import './LandingStyle.css'
import logo from '../images/logo.png'
import dashboard from './assets/images/landing/dashboard.svg'
import profile from './assets/images/landing/profile.svg'
import arrowright from './assets/images/landing/arrow-right.svg'
import homepage_checkout from './assets/images/landing/homepage-checkout.png'
import gpay from './assets/images/landing/gpay.png'
import app_store from './assets/images/landing/app-store.png'
import rupeepowered from './assets/images/landing/rupee-powered.png'
import multipleex from './assets/images/landing/multiple-ex.png'
import { Link, useNavigate } from 'react-router-dom'
import step1 from './assets/images/landing/step-1.png'
import step2 from './assets/images/landing/step-2.png'
import step3 from './assets/images/landing/step-3.png'
import step4 from './assets/images/landing/step-4.png'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GridViewIcon from '@mui/icons-material/GridView';
import Constant from "../Constansts";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import { Padding } from '@mui/icons-material'

// dashboard.
// profile.svg

const Landing = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('Mellifluous')
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const navbar = (
        <>

            {token ? (

                <ul class="navbar-nav me-auto mb-2 mb-lg-0 landing-page-menu">

                    <li class="nav-item">
                        <Link class="nav-link" aria-current="page" to='/market-overview'> <img src={dashboard} alt="imperial-logo" /> MARKET</Link>
                    </li>
                    {/* <li class="nav-item">
                                            <Link class="nav-link" to='/profile'> <img src={profile} alt="imperial-logo" /> PROFILE</Link>
                                        </li> */}
                    <li class="nav-item">
                        <Link class="nav-link" to='/dashboard' type="submit"><GridViewIcon />Dashboard</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" type="submit" onClick={() => logout()}><LoginIcon />Logout</Link>
                    </li>
                    {/* <li class="nav-item">
                                            <Link class="nav-link" to='/login' type="submit"><LoginIcon />Login</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" to='/register' type="submit"><PersonAddIcon />Sign-In</Link>
                                        </li> */}

                </ul>


            ) :
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 landing-page-menu">

                    <li class="nav-item">
                        <Link class="nav-link" aria-current="page" to='/market-overview'> <img src={dashboard} alt="imperial-logo" /> MARKET</Link>
                    </li>
                    {/* <li class="nav-item">
                                            <Link class="nav-link" to='/profile'> <img src={profile} alt="imperial-logo" /> PROFILE</Link>
                                        </li> */}
                    <li class="nav-item">
                        <Link class="nav-link" to='/dashboard' type="submit"><GridViewIcon />Dashboard</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/login' type="submit"><LoginIcon />Log-in</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/register' type="submit"><PersonAddIcon />Sign-Up</Link>
                    </li>

                </ul>

            }

        </>
    )

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <div className='pad'>
                <Link class="navbar-brand" to='#'>
                    <div class="imperial-logo"><img src={logo} alt="imperial-logo" /></div>
                </Link>
            </div>
            <div className='side-nav'>
                {navbar}
            </div>
        </Box>
    );


    const logout = () => {
        window.localStorage.removeItem("Mellifluous");
        window.localStorage.removeItem("users");
        window.localStorage.removeItem("kyc_verify");
        window.localStorage.removeItem("Squelch");
        window.localStorage.removeItem("AdminToken");
        window.localStorage.removeItem("electrónico");
        navigate(`${Constant.route}/`);
    };

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)} className='mui-drawer'>
                {DrawerList}
            </Drawer>

            <div class="landing-page">

                <main class="banner-background">
                    <header class="header-sctn">

                        <nav class="navbar navbar-expand-lg">
                            <div class="contain-width container-fluid head-bg-border">
                                <Link class="navbar-brand" to='#'>
                                    <div class="imperial-logo"><img src={logo} alt="imperial-logo" /></div>
                                </Link>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    onClick={toggleDrawer(true)}
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">


                                    {navbar}
                                </div>
                            </div>
                        </nav>
                    </header>
                    <section class="banner-main">
                        <div class="contain-width">
                            <div class="left-banner-sec">
                                <h1>The only <span>Trading</span> platform <br />
                                    you’ll need</h1>

                                <p>Trade across multiple exchanges with up to 80% lower fees & real-time charts!</p>

                                <div class="trade-apitrading">
                                    <Link class="btn trade" to='/spot' type="submit">TRADE NOW</Link>
                                    {/* <Link class="homepage-checkout for-night-mode" to='#'><img src={homepage_checkout} alt="homepage-checkout" /></Link> */}
                                </div>
                            </div>
                        </div>
                        {/* <img src="./assets/landing/banner-bottom-bg.png" class="banner-bottom-bg night" alt="banner-bottom-bg" />
                        <img src="./assets/landing/banner-bottom-bg-light.png" class="banner-bottom-bg light" alt="banner-bottom-bg" /> */}


                    </section>
                </main>

                <section class="multiple-ex">
                    <div class="contain-width">
                        <div class="row">
                            <div class="col-lg-7 col-md-12 col-sm-12">
                                <img src={multipleex} class="img-fluid" alt="multiple-ex" />
                            </div>
                            <div class="col-lg-5 col-md-12 col-sm-12 multiple-ex-right-side-info">
                                <h2>Multiple Exchanges,
                                    One Platform</h2>
                                <p style={{ margin: "15px 0 40px" }}>Make instant profits by buying and
                                    selling crypto with one wallet.</p>
                                <Link to='/spot'>Try Now &nbsp;<img src={arrowright} alt="arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="multiple-ex rupee-powered">
                    <div class="contain-width">
                        <div class="row">
                            <div class="col-lg-6 col-md-12 col-sm-12">
                                <img src={rupeepowered} class="img-fluid" alt="rupee-powered" />
                            </div>
                            <div class="col-lg-6 col-md-12 col-sm-12 multiple-ex-right-side-info">
                                <h2>Multi Exchange - Powered</h2>
                                <p style={{ margin: "15px 0 40px" }}>Save time on conversions so you can
                                    focus only on maximizing your profits.</p>
                                <Link to='/spot'>Try Now &nbsp;<img src={arrowright} alt="arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="latest-blog how-it-work">
                    <div class="contain-width">
                        <h6>How It Work</h6>
                        <p>
                            Please find below how to start your process on Imperial Exchange.
                        </p>
                        <div class="step-map">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div class="work-steps">
                                        <div class="step-start">
                                            <img src={step1} alt="step-1" />
                                        </div>
                                        <p>STEP 1</p>
                                        <p>Register</p>
                                        <p>
                                            Sign up with your credentials as a new user on the Imperial Exchange.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div class="work-steps">
                                        <div class="step-start">
                                            <img src={step2} alt="step-2" />
                                        </div>
                                        <p>STEP 2</p>
                                        <p>Fund Wallet</p>
                                        <p>
                                            Fund your wallet with the Crypto you desire to trade with on the Imperial Exchange.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div class="work-steps">
                                        <div class="step-start step3">
                                            <img src={step3} alt="step-3" />
                                        </div>
                                        <p>STEP 3</p>
                                        <p>Start trading</p>
                                        <p>
                                            Now you can start your trading within the Imperial Exchange.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                                    <div class="work-steps earn-last-step">
                                        <div class="step-start earn-last-step">
                                            <img src={step4} alt="step-4" />
                                        </div>
                                        <p>STEP 4</p>
                                        <p>Earn money</p>
                                        <p>
                                            Gain the access to your profits and continue to build up your wealth.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <footer>
                    <div class="contain-width">
                        <div class="footer-inner-div">
                            <Link to='#'>
                                <img src={logo} class="dark-logo" alt="imperial-logo" />
                            </Link>
                            <div class="row first-row">
                                <div class="col-lg-7">
                                    <div class="row">
                                        <div class="col-lg-5 col-md-4 cl-sm-12">
                                            <h6>Download App</h6>
                                            <div class="d-flex">
                                                <Link to='#'><img src={gpay} alt="gpay" /></Link>
                                                <Link to='#'><img src={app_store} alt="app-store" /></Link>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-4 cl-sm-12">
                                            <h6>Company</h6>
                                            <ul>
                                                <li><Link to='#'>About us</Link></li>
                                                <li><Link to='#'>Fees</Link></li>
                                                <li><Link to='#'>Coin Info</Link></li>
                                                <li><Link to='#'>What is Bitcoin?</Link></li>
                                                <li><Link to='#'>Security</Link></li>


                                            </ul>
                                        </div>
                                        <div class="col-lg-4 col-md-4 cl-sm-12">
                                            <h6>Services</h6>
                                            <ul>
                                                <li><Link to='/spot'>Spot Exchange</Link></li>
                                                {/* <li><Link to='#'>Staking </Link></li> */}
                                                {/* <li><Link to='#'>P2P Market Place</Link></li> */}
                                                <li><Link to='/market-overview'>Market</Link></li>
                                                <li><Link to='/wallet'>Wallet</Link></li>
                                                <li><Link to='/copy-trade'>Copy Trade</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <div class="row inner-row">
                                        <div class="col-lg-4 col-md-4 cl-sm-12">
                                            <h6>Policies</h6>
                                            <ul>
                                                <li><Link to='#'>Terms&Conditions</Link></li>
                                                <li><Link to='#'>AMLA CFT</Link></li>
                                                <li><Link to='#'>Refund Policy</Link></li>
                                                <li><Link to='#'>KYC & Policy</Link></li>
                                                <li><Link to='#'>Privacy Policy</Link></li>
                                                <li><Link to='#'>Cookie & Policy</Link></li>
                                                <li><Link to='#'>Risk & Disclosure</Link></li>
                                            </ul>
                                        </div>
                                        <div class="col-lg-4 col-md-4 cl-sm-12">
                                            <h6> Help</h6>
                                            <ul>
                                                <li><Link to='#'>FAQ</Link></li>
                                                <li><Link to='#'>Support</Link></li>
                                                <li><Link to='#'>Blog</Link></li>
                                                <li><Link to='#'>Trading Guide</Link></li>
                                            </ul>
                                        </div>


                                    </div>

                                </div>

                            </div>


                            <div class="row sec-row">
                                <div class="col-lg-3 col-md-6 cl-sm-12">
                                    <h6> Follow Us</h6>

                                    <div class="social-media">
                                        <Link to='#' class="sm">
                                            <svg width="25" height="25" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_23_532)">
                                                    <g clip-path="url(#clip1_23_532)">
                                                        <g clip-path="url(#clip2_23_532)">
                                                            <path d="M3.60125 9.4119L26.8725 0.439465C27.9526 0.0491346 28.8959 0.702809 28.5458 2.33629L24.5858 21.0014C24.292 22.3247 23.5057 22.6466 22.4055 22.0229L16.3716 17.576L13.4612 20.38C13.3177 20.5663 13.1331 20.7168 12.9217 20.8197C12.7103 20.9226 12.478 20.9752 12.2429 20.9733L12.6712 14.8348L23.8548 4.72935C24.3412 4.30106 23.7461 4.05974 23.1051 4.48615L9.28517 13.1873L3.3276 11.3265C2.03431 10.9184 2.00619 10.0356 3.60125 9.4119Z" fill="white" />
                                                        </g>
                                                    </g>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_532">
                                                        <rect width="31" height="22" fill="white" transform="translate(0 0.32959)" />
                                                    </clipPath>
                                                    <clipPath id="clip1_23_532">
                                                        <rect width="31" height="22" fill="white" transform="translate(0 0.32959)" />
                                                    </clipPath>
                                                    <clipPath id="clip2_23_532">
                                                        <rect width="26.2407" height="22" fill="white" transform="translate(2.37965 0.32959)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </Link>
                                        <Link to='#' class="sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 20 20" fill="none">
                                                <path d="M10.8584 1.6665C11.7959 1.669 12.2718 1.674 12.6826 1.68567L12.8443 1.6915C13.031 1.69817 13.2151 1.7065 13.4376 1.7165C14.3243 1.75817 14.9293 1.89817 15.4601 2.104C16.0101 2.31567 16.4735 2.60234 16.9368 3.06484C17.3605 3.48142 17.6884 3.98533 17.8976 4.5415C18.1035 5.07234 18.2435 5.67734 18.2851 6.56484C18.2951 6.7865 18.3035 6.97067 18.3101 7.15817L18.3151 7.31984C18.3276 7.72984 18.3326 8.20567 18.3343 9.14317L18.3351 9.76484V10.8565C18.3372 11.4643 18.3308 12.0722 18.316 12.6798L18.311 12.8415C18.3043 13.029 18.296 13.2132 18.286 13.4348C18.2443 14.3223 18.1026 14.9265 17.8976 15.4582C17.689 16.0147 17.3611 16.5187 16.9368 16.9348C16.5201 17.3584 16.0162 17.6863 15.4601 17.8957C14.9293 18.1015 14.3243 18.2415 13.4376 18.2832C13.2399 18.2925 13.0421 18.3008 12.8443 18.3082L12.6826 18.3132C12.2718 18.3248 11.7959 18.3307 10.8584 18.3323L10.2368 18.3332H9.14595C8.53783 18.3353 7.92972 18.3289 7.32178 18.314L7.16012 18.309C6.96229 18.3015 6.76451 18.2929 6.56678 18.2832C5.68012 18.2415 5.07512 18.1015 4.54345 17.8957C3.98734 17.6868 3.48363 17.3589 3.06762 16.9348C2.64349 16.5184 2.3153 16.0145 2.10595 15.4582C1.90012 14.9273 1.76012 14.3223 1.71845 13.4348C1.70917 13.2371 1.70083 13.0393 1.69345 12.8415L1.68928 12.6798C1.67393 12.0722 1.66698 11.4643 1.66845 10.8565V9.14317C1.66612 8.53534 1.67224 7.9275 1.68678 7.31984L1.69262 7.15817C1.69928 6.97067 1.70762 6.7865 1.71762 6.56484C1.75928 5.67734 1.89928 5.07317 2.10512 4.5415C2.31438 3.98476 2.64322 3.48069 3.06845 3.06484C3.48436 2.64107 3.98774 2.31316 4.54345 2.104C5.07512 1.89817 5.67928 1.75817 6.56678 1.7165C6.78845 1.7065 6.97345 1.69817 7.16012 1.6915L7.32178 1.6865C7.92944 1.6717 8.53728 1.66531 9.14512 1.66734L10.8584 1.6665ZM10.0018 5.83317C8.89671 5.83317 7.83691 6.27216 7.0555 7.05356C6.2741 7.83496 5.83512 8.89477 5.83512 9.99984C5.83512 11.1049 6.2741 12.1647 7.0555 12.9461C7.83691 13.7275 8.89671 14.1665 10.0018 14.1665C11.1069 14.1665 12.1667 13.7275 12.9481 12.9461C13.7295 12.1647 14.1685 11.1049 14.1685 9.99984C14.1685 8.89477 13.7295 7.83496 12.9481 7.05356C12.1667 6.27216 11.1069 5.83317 10.0018 5.83317ZM10.0018 7.49984C10.3301 7.49978 10.6552 7.56439 10.9585 7.68998C11.2619 7.81557 11.5375 7.99967 11.7697 8.23178C12.0019 8.46388 12.1861 8.73945 12.3117 9.04274C12.4374 9.34604 12.5021 9.67112 12.5022 9.99942C12.5023 10.3277 12.4376 10.6528 12.3121 10.9562C12.1865 11.2595 12.0024 11.5351 11.7703 11.7673C11.5382 11.9995 11.2626 12.1837 10.9593 12.3094C10.656 12.4351 10.3309 12.4998 10.0026 12.4998C9.33958 12.4998 8.70369 12.2364 8.23485 11.7676C7.76601 11.2988 7.50262 10.6629 7.50262 9.99984C7.50262 9.3368 7.76601 8.70091 8.23485 8.23207C8.70369 7.76323 9.33958 7.49984 10.0026 7.49984M14.3776 4.58317C14.1013 4.58317 13.8364 4.69292 13.641 4.88827C13.4457 5.08362 13.3359 5.34857 13.3359 5.62484C13.3359 5.9011 13.4457 6.16606 13.641 6.36141C13.8364 6.55676 14.1013 6.6665 14.3776 6.6665C14.6539 6.6665 14.9188 6.55676 15.1142 6.36141C15.3095 6.16606 15.4193 5.9011 15.4193 5.62484C15.4193 5.34857 15.3095 5.08362 15.1142 4.88827C14.9188 4.69292 14.6539 4.58317 14.3776 4.58317Z" fill="black" />
                                            </svg>

                                        </Link>
                                        <Link to='#' class="sm">
                                            <i class="fa-brands fa-square-facebook"></i>
                                        </Link>
                                        <Link to='#' class="sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 20 20" fill="none">
                                                <g mask="url(#mask0_342_17628)">
                                                    <path d="M14.6 2.74951H17.0537L11.6937 8.89123L18 17.2501H13.0629L9.19314 12.1815L4.77029 17.2501H2.31429L8.04686 10.6787L2 2.75065H7.06286L10.5554 7.38265L14.6 2.74951ZM13.7371 15.7781H15.0971L6.32 4.14494H4.86171L13.7371 15.7781Z" fill="black" />
                                                </g>
                                            </svg>
                                        </Link>
                                        <Link to='#' class="sm">
                                            <svg width="25" height="25" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_23_556)">
                                                    <g clip-path="url(#clip1_23_556)">
                                                        <g clip-path="url(#clip2_23_556)">
                                                            <path d="M30.3522 3.34876C30.1461 2.74073 29.7849 2.197 29.3043 1.77133C28.8237 1.34565 28.2404 1.05278 27.6119 0.921644C25.1939 0.348144 15.5 0.348145 15.5 0.348145C15.5 0.348145 5.80612 0.348144 3.38812 0.9221C2.75964 1.05323 2.17627 1.34611 1.69567 1.77178C1.21507 2.19745 0.853883 2.74118 0.647809 3.34922C0 5.49004 0 11.3294 0 11.3294C0 11.3294 0 17.1702 0.647809 19.3106C0.853883 19.9186 1.21507 20.4623 1.69567 20.888C2.17627 21.3137 2.75964 21.6066 3.38812 21.7377C5.80612 22.3112 15.5 22.3112 15.5 22.3112C15.5 22.3112 25.1939 22.3112 27.6119 21.7372C28.2404 21.6063 28.8239 21.3135 29.3046 20.8878C29.7852 20.4621 30.1463 19.9183 30.3522 19.3101C31 17.1702 31 11.3294 31 11.3294C31 11.3294 31 5.49004 30.3522 3.34876ZM12.4 14.8958V7.76353C12.4139 7.63478 12.4597 7.51152 12.5332 7.4049C12.6067 7.29827 12.7056 7.21164 12.821 7.15282C12.9363 7.094 13.0646 7.06485 13.194 7.068C13.3235 7.07116 13.4501 7.10651 13.5625 7.17088L20.5375 10.7372C20.6528 10.7881 20.7509 10.8713 20.8197 10.9769C20.8885 11.0824 20.9252 11.2057 20.9252 11.3317C20.9252 11.4577 20.8885 11.581 20.8197 11.6866C20.7509 11.7921 20.6528 11.8754 20.5375 11.9262L13.5625 15.4926C13.4499 15.5571 13.3229 15.5925 13.1931 15.5955C13.0633 15.5985 12.9348 15.569 12.8193 15.5097C12.7038 15.4504 12.6049 15.3632 12.5317 15.256C12.4585 15.1488 12.4132 15.025 12.4 14.8958Z" fill="white" />
                                                        </g>
                                                    </g>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_23_556">
                                                        <rect width="31" height="22" fill="white" transform="translate(0 0.32959)" />
                                                    </clipPath>
                                                    <clipPath id="clip1_23_556">
                                                        <rect width="31" height="22" fill="white" transform="translate(0 0.32959)" />
                                                    </clipPath>
                                                    <clipPath id="clip2_23_556">
                                                        <rect width="31" height="21.963" fill="white" transform="translate(0 0.348145)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </Link>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-6 cl-sm-12">
                                    <h6>Contact</h6>
                                    {/* <p>General Queries - <Link to='#'>support@trurofin.com</Link></p> */}
                                </div>
                            </div>


                        </div>

                        <div class="copy-right">
                            © 2024 Imperial. All rights reserved.
                        </div>

                    </div>
                </footer>

            </div>
        </div>
    )
}

export default Landing
