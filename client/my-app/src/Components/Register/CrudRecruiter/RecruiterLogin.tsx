import React from 'react';
//import { Recruiter } from '../../types/Recruiters';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    useQuery,
    useMutation,
    gql,
    ApolloLink,
    HttpLink,
    concat
} from '@apollo/client';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const LOGIN_EMPRESA = gql`
    mutation($email: String!, $password: String!) {
        loginEmpresa(email: $email, password: $password) {
            token
        }
    }
`;

const LOGIN_EMPRESA_GOOGLE = gql`
    mutation($email: String!, $googleId: String!) {
        loginGoogleEmpresa(email: $email, googleId: $googleId) {
            token
        }
    }
`;
const RecruiterRegister: React.FC = () => {
    const history = useHistory();
    const [loginEmpresa] = useMutation(LOGIN_EMPRESA);
    const [loginGoogleEmpresa] = useMutation(LOGIN_EMPRESA_GOOGLE);

    const handleGoogle = async (res: any) => {
        const user = res.profileObj;
        const logged = localStorage.getItem('token');
        console.log(logged);
        if (logged !== null) {
            console.log('logueado');
            toast.error('User logged');
            history.push('/');
        } else {
            try {
                console.log(user);
                const { data } = await loginGoogleEmpresa({
                    variables: {
                        email: user.email,
                        googleId: user.googleId
                    }
                });
                console.log(data);
                const token = data.loginGoogleEmpresa.token;
                localStorage.setItem('token', token);
                toast.success('Reclutador Logueado');
                history.push('/catalogue');
            } catch (error) {
                console.log(error);
                console.log('errorHandler');
                toast.error('error');
                window.history.go();
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('The email is not valid')
                .required('The email is required'),
            password: Yup.string()
                .required('The password cannot be empty')
                .min(6, 'The password must be at least 6 characters long')
        }),
        onSubmit: async (valores, { resetForm }) => {
            console.log('enviando');
            console.log(valores);
            const { email, password } = valores;
            const logged = localStorage.getItem('token');
            console.log(logged);
            if (logged !== null) {
                console.log('logueado');
                toast.error(
                    'Usuario logueado, cierre sesión y vuelva a intentar'
                );
                history.push('/login');
            } else {
                try {
                    const { data } = await loginEmpresa({
                        variables: {
                            email,
                            password
                        }
                    });
                    const token = data.loginEmpresa.token;
                    localStorage.setItem('token', token);
                    toast.success('Empresa Logueada');
                    history.push('/catalogue');
                } catch (error) {
                    console.log(error);
                    toast.error('error');
                    window.history.go();
                }
                resetForm();
            }
        }
    });
    const errorHandler = () => {
        toast.error('Error de loggeo Google');
        history.push('/login');
    };

    return (
        <div>
            <div className="flex max-w-sm mx-auto bg-yellow_henry dark:bg-gray-800 rounded-b-lg shadow-lg overflow-hidden lg:max-w-2xl ">
                <div className="w-full py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                        Company
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
                        Log In
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                htmlFor="company_email">
                                Email Address
                            </label>
                            <input
                                id="company_email"
                                name="email"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                    htmlFor="company_password">
                                    Password
                                </label>
                            </div>
                            <input
                                id="company_password"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}
                        <div>
                            <Link
                                to="/resetInputEmpresa"
                                className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                                oops...Forgot my password
                            </Link>
                        </div>

                        <div className="flex flex-row justify-around self-center mt-10 mb-10">
                            <button
                                type="submit"
                                className="bg-grayHenry text-white text-xl font-medium mr-2 py-1 px-4 w-full rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Log In
                            </button>
                            <button className="flex justify-center bg-grayHenry text-white ml-2 py-1.5 px-4 w-full rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                <GoogleLogin
                                    clientId="441295774359-pes9htc9bkbsbi00dgl3bara1ahkcv4s.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                        <button
                                            className="flex justify-center bg-grayHenry text-white ml-2 py-1.5 px-4 w-full rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}>
                                            <svg
                                                width="75"
                                                height="25"
                                                viewBox="0 0 75 25"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9.23646 0.00292969H9.9034C12.2188 0.0532653 14.4965 0.984473 16.1324 2.63296C15.5284 3.24957 14.9118 3.84102 14.3203 4.45763C13.4017 3.62709 12.2943 2.98531 11.0863 2.7588C9.29937 2.38129 7.37404 2.72105 5.87656 3.74035C4.24065 4.80998 3.13327 6.62206 2.89417 8.55998C2.62991 10.4727 3.17102 12.4862 4.41682 13.9711C5.61229 15.4182 7.43696 16.3242 9.32454 16.3872C11.0863 16.4878 12.9235 15.9467 14.2071 14.7135C15.2138 13.8452 15.6794 12.5239 15.8304 11.2403C13.7415 11.2403 11.6526 11.2529 9.56364 11.2403V8.64806H18.3598C18.8128 11.4291 18.1584 14.5625 16.0443 16.5507C14.6349 17.9601 12.6844 18.7907 10.6962 18.9543C8.77085 19.143 6.7826 18.7781 5.07119 17.8469C3.02001 16.7521 1.38411 14.9023 0.578737 12.7252C-0.176297 10.7244 -0.18888 8.45931 0.515818 6.44588C1.1576 4.60863 2.39082 2.98531 3.97639 1.85276C5.49904 0.732796 7.34887 0.116185 9.23646 0.00292969Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M59.6982 0.656494H62.3912V18.6263C61.4977 18.6263 60.5917 18.6389 59.6982 18.6137C59.7108 12.6364 59.6982 6.64643 59.6982 0.656494V0.656494Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M24.35 6.88555C26.0111 6.57096 27.8106 6.92331 29.1822 7.91744C30.428 8.79831 31.2963 10.1825 31.5606 11.6926C31.9004 13.4418 31.4725 15.3545 30.34 16.7388C29.1193 18.2866 27.1185 19.1171 25.168 18.9913C23.3811 18.8906 21.6445 17.9971 20.5874 16.5374C19.392 14.9267 19.1025 12.7119 19.7569 10.8243C20.4113 8.79831 22.2611 7.25049 24.35 6.88555V6.88555ZM24.7275 9.2765C24.048 9.45267 23.4188 9.84277 22.9658 10.3965C21.7452 11.8562 21.8207 14.2346 23.1671 15.5936C23.9348 16.3738 25.0925 16.7388 26.1621 16.5248C27.1562 16.3487 28.0245 15.6817 28.5027 14.8008C29.3332 13.3033 29.0942 11.2396 27.8232 10.0693C27.0052 9.31425 25.8098 8.99965 24.7275 9.2765Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M37.6888 6.88563C39.589 6.52069 41.6653 7.04922 43.0873 8.38311C45.4028 10.4595 45.6544 14.3479 43.6788 16.7388C42.4833 18.2489 40.5454 19.0794 38.6326 18.9913C36.808 18.941 35.0085 18.035 33.9263 16.5375C32.7056 14.889 32.4414 12.6239 33.1335 10.6985C33.8256 8.73546 35.6377 7.23798 37.6888 6.88563V6.88563ZM38.0664 9.27657C37.3868 9.45274 36.7576 9.84284 36.3046 10.3839C35.0966 11.8185 35.1469 14.1591 36.443 15.5308C37.2106 16.3487 38.4061 16.7514 39.5135 16.5249C40.495 16.3361 41.3759 15.6818 41.8541 14.8009C42.6721 13.2908 42.433 11.2271 41.1494 10.0568C40.3315 9.30173 39.136 8.99972 38.0664 9.27657Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M49.0018 7.6154C50.4489 6.70935 52.3742 6.45768 53.9346 7.23788C54.4254 7.4518 54.8281 7.81674 55.2182 8.18167C55.2308 7.84191 55.2182 7.48956 55.2308 7.13721C56.0739 7.14979 56.917 7.13721 57.7727 7.14979V18.2488C57.7601 19.9225 57.3323 21.6968 56.1242 22.9174C54.8029 24.2639 52.7769 24.6792 50.9523 24.4023C49.0018 24.1129 47.3029 22.6909 46.5479 20.8914C47.3029 20.5265 48.0957 20.237 48.8759 19.8973C49.3164 20.9292 50.2098 21.81 51.3298 22.0114C52.4497 22.2127 53.7459 21.9359 54.4758 21.0047C55.256 20.0483 55.256 18.7396 55.2182 17.5693C54.6393 18.1355 53.9724 18.6389 53.167 18.8277C51.4179 19.3184 49.4925 18.7144 48.1461 17.5315C46.787 16.3486 45.9816 14.524 46.0571 12.7119C46.0949 10.6607 47.2526 8.68503 49.0018 7.6154V7.6154ZM51.6066 9.22614C50.839 9.35197 50.1217 9.77983 49.631 10.3713C48.4481 11.7807 48.4481 14.0332 49.6435 15.4174C50.3231 16.2354 51.4179 16.6884 52.4749 16.5751C53.469 16.4745 54.3877 15.8453 54.8784 14.977C55.709 13.5047 55.5706 11.5038 54.4506 10.2203C53.7585 9.42748 52.6511 9.03738 51.6066 9.22614V9.22614Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M65.6248 8.25722C67.1348 6.84782 69.4629 6.36963 71.4008 7.11208C73.238 7.8042 74.4083 9.55336 74.9998 11.3529C72.2691 12.4854 69.551 13.6054 66.8202 14.7379C67.1978 15.4552 67.7766 16.1096 68.5568 16.3738C69.6516 16.7639 70.9604 16.6255 71.879 15.8956C72.2439 15.6188 72.5333 15.2539 72.8102 14.9015C73.5023 15.3671 74.1944 15.8201 74.8865 16.2857C73.905 17.7581 72.2565 18.7899 70.4822 18.9535C68.5191 19.1926 66.4301 18.4376 65.1592 16.9024C63.0702 14.4862 63.2716 10.4342 65.6248 8.25722V8.25722ZM66.9713 10.5852C66.5434 11.2018 66.3672 11.9569 66.3798 12.6993C68.2045 11.9443 70.0291 11.1893 71.8538 10.4216C71.5518 9.71695 70.8219 9.2891 70.0795 9.17584C68.884 8.96191 67.6382 9.60369 66.9713 10.5852V10.5852Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={handleGoogle}
                                    onFailure={errorHandler}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-600 w-1/5 md:w-1/4"></span>

                        <Link
                            to="/register"
                            className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                            or Register
                        </Link>

                        <span className="border-b  border-grayHenry dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterRegister;
