import React from 'react';

interface Props {
    className?: string;
    menuIsOpen?: boolean;
}

const CustomDropdownIndicator: React.FC<Props> = ({ className, menuIsOpen }) => {
	return (
		<div className={className}>
			<img
				src="/icon.svg" // Путь к изображению в папке public
				alt="Dropdown Indicator"
				style={{
					width: '20px',
					height: '20px',
					margin: '10px 16px 5px 16px',
					transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
				}}
			/>
		</div>
	);
};

export default CustomDropdownIndicator;
