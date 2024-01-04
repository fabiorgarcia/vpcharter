import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ErrorPage = () => {

    const [page, setPage] = useState ('');
    const navigate = useNavigate();



  return (
    <div>
        <h1>Errro 404!</h1>
    </div>
  )
}

export default ErrorPage