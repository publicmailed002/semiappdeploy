import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAniamtedContainer from '../components/BorderAnimatedContainer'
import { LoaderIcon, LockIcon, MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router'

function LoginPage() {

  const [formData ,setFormData] = useState({email :"" , password :""})
    const {login , isLogingIn}  = useAuthStore()
  
  
    const handleSubmit = (e) =>{
      e.preventDefault()
      login(formData);
    }
   return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAniamtedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                    {/* HEADING TEXT */}
                    <div className='text-center mb-8'>
                       <MessageCircleIcon  className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                       <h2 className='text-2xl font-bold text-slate-400 mb-4'>welecom back</h2>
                       <p className='text-slate-400'> login in to access your account</p>

                    </div>
                    {/* FORM */}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                      {/* Email Input */}
                      <div>
                           <label className='auth-input-label'>Email</label>
                           <div className='relative'>
                                <MailIcon className='auth-input-icon'/>

                                <input type='email' 
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData , email:e.target.value})}
                                 className='input'
                                 placeholder='My Email @'
                                />

                           </div>
                      </div>

                      {/* PASSWORD INPUT */}
                      <div>
                           <label className='auth-input-label'>Password</label>
                           <div className='relative'>
                                <LockIcon className='auth-input-icon'/>

                                <input type='password' 
                                 value={formData.password}
                                 onChange={(e) => setFormData({...formData , password:e.target.value})}
                                 className='input'
                                 placeholder='My Password'
                                />

                           </div>
                      </div>
                      {/* BUTTON SUBMITE */}

                      <button className='auth-btn' type='submit' disabled={isLogingIn}>
                        {isLogingIn ?(
                          <LoaderIcon  className='w-full h-5 animate-spin text-center'/>
                        ) : (
                          "Sigin in"
                        )
                      }
                      </button>
                    </form>
                    
                    <div className='mt-6 text-center'>

                      <Link to="/signup" className='auth-link' >
                        Don't have account? Sign in
                      </Link>

                    </div>

                  </div>

                </div>
                {/* FROM ILSTRAITION RIGHT SIDE */}
                <div className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-linear-to-bl from-slate-800/20 to-transparent'>
                   <div>
                       <img
                        src='/login.png'
                        alt='Pepole using mobile device'
                        className='w-full h-auto object-contain'
                       />
                       <div className='mt-6 text-center'>
                          <h3 className='text-xl font-medium text-cyan-400'> Connect Anytime , and Anywher</h3>
                          <div className='mt-4 flex justify-center gap-4'>
                            <span className='auth-badge'>Secure</span>
                            <span className='auth-badge'>Fast</span>
                            <span className='auth-badge'>Realiable</span>

                          </div>
                       </div>
                   </div>
                </div>
              </div>
            </BorderAniamtedContainer>

           </div>
    </div>
  )
}

export default LoginPage
