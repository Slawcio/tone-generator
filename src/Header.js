import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './Header.css'

function Header() {
   return(
       <div className="aligned center" style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '1em 0 2em 0'}}>
           <h2 className="ui customHeader header left aligned inverted">
               <i className="music icon inverted"></i>
               <div className="content">
                   Procedural composing
                   <div className="sub header">Set parameters of your song and click play!</div>
               </div>
           </h2>
       </div>
   )
}
export default Header;