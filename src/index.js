// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import HomeDetail from './HomeDetail';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={ <App /> }>
//         <Route path="/HomeDetail" element={<HomeDetail />}/>
        
//         </Route>
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//const container = document.getElementById('root');
//ReactDOM.render(element, container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

////old version
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();