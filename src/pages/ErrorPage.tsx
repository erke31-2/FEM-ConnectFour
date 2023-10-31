import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <main className="max-w-[350px] mx-auto flex flex-col gap-y-3 items-center text-white">
        <h2 className="text-3xl font-bold">Oops 404 Error!</h2>
        <span className="font-semibold">Page Not Found.</span>
        <Link to={"/"} className="border border-white py-2 px-3 rounded-sm hover:border-black hover:text-black transition">Back to Home Menu</Link>
    </main> 
  )
}
export default ErrorPage