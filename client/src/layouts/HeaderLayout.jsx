import MainHeader from "../Components/HeaderBar";

const HeaderLayout = ({children}) => {
    return ( 
        <>
             <MainHeader /> 
             <div className="content">
                {children}
             </div>
        </>
     );
}
 
export default HeaderLayout;