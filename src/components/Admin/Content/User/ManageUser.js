import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss"
import { useEffect, useState } from "react";
import { getUsers } from "../../../../services/apiService";
import { FaPlusCircle } from 'react-icons/fa';
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailUser from "./ModalDetailuser";
import ModalDeleteUser from "./ModalDeleteUser";
import { useTranslation } from "react-i18next";

const ManageUser = () => {
    const { t } = useTranslation();

    const LIMIT_USER = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDetailUser, setShowModalDetailUser] = useState(false);
    const [showModalDeletelUser, setShowModalDeleteUser] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDetail, setDataDetail] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUser(1);
    }, [])

    const fetchListUser = async (page) => {
        let res = await getUsers(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickUpdateIcon = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickViewIcon = (user) => {
        setShowModalDetailUser(true);
        setDataDetail(user);
    }

    const handleClickDeleteIcon = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    return (
        <div className="manage-user-container">
            <div className="title text-primary text-center">
                {t('managaUser.title')}
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button
                        className="btn btn-success d-flex align-items-center"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FaPlusCircle className="text-warning me-2" />{t('managaUser.add')}
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser
                        listUser={listUser}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        itemsPerPage={LIMIT_USER}
                        setCurrentPage={setCurrentPage}
                        handleClickUpdateIcon={handleClickUpdateIcon}
                        handleClickViewIcon={handleClickViewIcon}
                        handleClickDeleteIcon={handleClickDeleteIcon}
                        fetchListUser={fetchListUser}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchListUser={fetchListUser}
                    currentPage={currentPage}
                />
                <ModalDetailUser
                    show={showModalDetailUser}
                    setShow={setShowModalDetailUser}
                    dataDetail={dataDetail}
                />
                <ModalDeleteUser
                    show={showModalDeletelUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;