import { NavLink, Link } from "react-router-dom";


// https://dev.to/ridhikgovind/how-to-style-your-react-router-links-using-styled-components-2350
// https://www.youtube.com/watch?v=B0vZGTGgIdc
// https://flowbite.com/docs/components/navbar/
// https://reactrouter.com/en/main/components/nav-link


const links = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/films" },
    { name: "Mis entradas", path: "/entradas" },
    { name: "Mis favoritas", path: "/favoritas" },
];

const activeLinkClass = 'block py-2 px-3 text-primary-500 rounded md:p-0'
const linkClass = 'block py-2 px-3 text-white rounded hover:text-primary-600 md:p-0'


function AppNavbar() {
    return (
        <nav className="bg-darksurf-200 rounded-md mb-1">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={'./public/img/ico.webp'} className="h-9" alt="Web Logo" />
                    <span className="self-center text-2xl font-semibold text-pink-300 whitespace-nowrap">Space cinema</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {
                            links.map((link, index) => (
                                <li key={index}>
                                    <NavLink key={index} to={link.path} className={({ isActive }) =>
                                        isActive ? activeLinkClass : linkClass
                                    }>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AppNavbar