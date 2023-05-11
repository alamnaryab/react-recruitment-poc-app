import '../../../assets/bootstrap.css'
import '../../../assets/bootstrap-mdb.css'
import './login.css'

const Login = () => {
  return (

    
 
        
        <section className="background-radial-gradient overflow-hidden mh-100">
            <div className="container px-4 py-5 px-md-5 text-lg-start">
                <div className="row gx-lg-5 align-items-center mb-5">
                <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                    <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                    Recruitment System <br />
                    <span style={{ color: "hsl(218, 81%, 75%)" }}>Company name</span>
                    </h1>
                    <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                    Please register your account to get shortlisted for current and upcoming vacancies at Company name
                    </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <div className="card bg-glass">
                    <div className="card-body px-4 py-5 px-md-5">
                        <form>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example1">First name</label>
                                <input type="text" id="form3Example1" className="form-control" />
                            </div>
                            </div>
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="form3Example2">Last name</label>
                                <input type="text" id="form3Example2" className="form-control" />
                            </div>
                            </div>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                            <input type="email" id="form3Example3" className="form-control" />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                            <input type="password" id="form3Example4" className="form-control" />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                            <input type="password" id="form3Example4" className="form-control" />
                        </div>
                         
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Sign up
                        </button>
                         
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        
  )
}

export default Login