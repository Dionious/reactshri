// ErrorComponent.tsx

import React from 'react';

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
	return (
		<div>
			<p>Oops! Something went wrong:</p>
			<p>{message}</p>
		</div>
	);
};

export default ErrorComponent;
