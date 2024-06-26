import React from 'react';
import icon from './assets/icon.svg'; // Импорт SVG файла

interface Props {
    className?: string;
	menuIsOpen?: boolean; // Состояние открытого меню
}

const CustomDropdownIndicator: React.FC<Props> = ({ className, menuIsOpen }) => {
	return (
		<div className={className}>
			<img src={icon} alt="Dropdown Indicator" style={{ width: '20px', height: '20px', margin: '10px 16px 5px 16px', transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
		</div>
	);
};

export default CustomDropdownIndicator;
