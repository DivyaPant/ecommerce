import { Outlet, Link } from "react-router";


const AuthLayout = () => {

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-brand-background">
      <div className="flex-1 bg-white p-6 max-w-lg m-8 border-2 border-gray-200">
        <div className="p-6">
        <Outlet />

        <div className="mt-8 border-t border-gray-200"></div>
        <div className="text-center -translate-y-1/2 leading-none">
          <span className="px-2 text-sm text-secondary-text bg-white">OR</span>
        </div>
                  
        <div className="py-4">
        <p className="text-md text-secondary-text">Continue without signin? 
          <Link to="/" className="text-primary-text underline pl-1">Explore</Link>
          </p>
      </div>
      </div>
      </div>
    </div>
  )
}


export default AuthLayout;