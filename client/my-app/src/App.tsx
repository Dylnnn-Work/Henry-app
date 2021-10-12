import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CatalogueHenrys from './Components/Catalogue/CatalogueHenrys';
import LandingPage from './Components/LandingPage/LandingPage';
import './styles/index.css';
import StudentsRegisterForm from './Components/Register/CrudStudent/StudentsLogin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RecruiterRegister from './Components/Register/CrudRecruiter/RecruiterRegister';
import ProfileAlumn from './Components/Profiles/ProfileHenry/ProfileAlumn';
import Sidebar from './Components/Admin/Sidebar';
import CrudLogin from './Components/Register/CrudLogin';
import CrudRegister from './Components/Register/CrudRegister';
import ProfileRecruiter from './Components/Profiles/ProfileRecruiter/ProfileRecruiter';
import NewsView from './Components/OtherFeatures/NewsView';
import ResetPasswordAlumno from './Components/OtherFeatures/ResetPasswordAlumno';
import ResetPasswordEmpresa from './Components/OtherFeatures/ResetPasswordEmpresa';
import NewsViewDelete from './Components/OtherFeatures/NewsViewDelete';
import NewsPost from './Components/OtherFeatures/NewsPost';
import ResetInputAlumno from './Components/OtherFeatures/ResetInputAlumno';
import ResetInputEmpresa from './Components/OtherFeatures/ResetInputEmpresa';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Route exact path="/" component={LandingPage} />
                <Route path="/admin" component={Sidebar} />
                {/* <Route exact path="/admin/list" component={ListRecruiter} /> */}

                {/* <LandingPage /> */}
                <Route exact path="/catalogue" component={CatalogueHenrys} />

                {/* <CatalogueHenrys /> */}
                <Route path="/createRecruiter" component={RecruiterRegister} />

                <Route
                    exact
                    path="/createStudent"
                    component={StudentsRegisterForm}
                />
                <Route
                    exact
                    path="/profileAlumn/:id"
                    render={({ match }) => (
                        <ProfileAlumn id={match.params.id} />
                    )}
                />

                {/* <Route path="/profileAlumn" component={ProfileAlumn} /> */}

                <Route
                    path="/profileRecruiter/:id"
                    component={ProfileRecruiter}
                />

                <Route path="/login" component={CrudLogin} />
                <Route path="/register" component={CrudRegister} />

                <Route path="/news-view" component={NewsView} />
                <Route
                    path="/resetPasswordAlumno"
                    component={ResetPasswordAlumno}
                />
                <Route
                    path="/resetPasswordEmpresa"
                    component={ResetPasswordEmpresa}
                />
                <Route path="/news-view-delete" component={NewsViewDelete} />
                <Route path="/resetInputAlumno" component={ResetInputAlumno} />
                <Route
                    path="/resetInputEmpresa"
                    component={ResetInputEmpresa}
                />
            </Router>
            <ToastContainer autoClose={2000} />
        </>
    );
};

export default App;
