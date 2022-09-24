import React, { useState, useEffect } from "react"
import styles from "styles/login.module.css"

import { withPublic } from "src/hooks/auth/route";

import Image from "next/image"
import logo from "public/logo.jpg"

import {
  GoogleLoginButton,
  FacebookLoginButton,
  AppleLoginButton
} from "react-social-login-buttons"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Login = ({auth}) => {
  return (
    <>
    </>
  )
}

export default withPublic(Login);