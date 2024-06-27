import React from 'react';
import styles from './styles/Pagination.module.css';
import classNames from 'classnames';

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
		totalPages > 1 && (<div className={styles['pagination-container']}>
			<div className={classNames(styles['pagination-left'], {
				[styles['pagination-left-disabled']]: currentPage === 1,
			})} onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}></div>
			<span>{currentPage}</span>
			<div className={classNames(styles['pagination-right'], {
				[styles['pagination-right-disabled']]: currentPage === totalPages,
			})} onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}></div>
		</div>)
	);
};

export default Pagination;