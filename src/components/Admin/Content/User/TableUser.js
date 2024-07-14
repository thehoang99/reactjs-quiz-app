import { useTranslation } from 'react-i18next';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const TableUser = (props) => {
    const {
        listUser, pageCount, currentPage, setCurrentPage, itemsPerPage,
        handleClickUpdateIcon, handleClickViewIcon, handleClickDeleteIcon,
        fetchListUser
    } = props;

    const { t, i18n } = useTranslation();

    const handlePageClick = (event) => {
        fetchListUser(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            {listUser && listUser.length > 0 ?
                <table className="table table-bordered table-hover mt-4">
                    <thead>
                        <tr className="bg-info">
                            <th scope="col">#</th>
                            <th scope="col">{t('tableUser.username')}</th>
                            <th scope="col">{t('tableUser.email')}</th>
                            <th scope="col">{t('tableUser.role')}</th>
                            <th scope="col">{t('tableUser.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUser.map((item, index) => {
                                return (
                                    <tr key={`table-user-${index}`}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button className="btn" onClick={() => handleClickViewIcon(item)}>
                                                <FaEye className="text-secondary" />
                                            </button>
                                            <button className="btn" onClick={() => handleClickUpdateIcon(item)}>
                                                <FaEdit className="text-warning" />
                                            </button>
                                            <button className="btn" onClick={() => handleClickDeleteIcon(item)}>
                                                <FaTrash className="text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                :
                <p className="text-danger mt-4">{t('tableUser.invalid')}</p>
            }
            <div className='d-flex justify-content-center mt-4'>
                <ReactPaginate
                    nextLabel={i18n.language === "en" ? "Next >" : "Sau >"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={i18n.language === "en" ? "< Prev" : "< Trước"}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUser;