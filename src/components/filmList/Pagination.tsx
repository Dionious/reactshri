import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	return (
		<div>
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					style={{ fontWeight: page === currentPage ? 'bold' : 'normal' }}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;