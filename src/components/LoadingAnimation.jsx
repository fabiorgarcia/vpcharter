const LoadingAnimation = () => {
    return (
        <div className="bg_loading">

            <div className="profile-main-loader">
                {/*<h4>Processando...</h4>*/}
                <div className="loader2">
                    <svg className="circular-loader"viewBox="25 25 50 50" >
                    <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#153d64" strokeWidth="2" />
                    </svg>
                </div>
            </div>

        </div>
    )
}
export default LoadingAnimation;