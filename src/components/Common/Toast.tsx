import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => (
	<ToastContainer
		position="top-right"
		autoClose={3000}
		hideProgressBar={false}
		newestOnTop={true}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="colored"
		role="alert"
		aria-live="assertive"
		toastClassName="text-sm font-medium"
		closeButton={<span title='Close notification' aria-label='Close'>&times;</span>}
		className="text-xs"
	/>
);

export default Toast;
