import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { getOverviewDashboard } from '../../../services/apiService';
import { useTranslation } from 'react-i18next';

const DashBoard = () => {
    const { t, i18n } = useTranslation();

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchOverview();
    }, [])

    const fetchOverview = async () => {
        const res = await getOverviewDashboard();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            let us = 0, qz = 0, qs = 0, as = 0;
            us = res?.DT?.users?.total;
            qz = res?.DT?.others.countQuiz;
            qs = res?.DT?.others.countQuestions;
            as = res?.DT?.others.countAnswers;

            const dataEng = [
                {
                    "name": "User",
                    "us": us,
                },
                {
                    "name": "Quiz",
                    "qz": qz,
                },
                {
                    "name": "Question",
                    "qs": qs,
                },
                {
                    "name": "Answer",
                    "as": as,
                }
            ]

            const dataVie = [
                {
                    "name": "Người dùng",
                    "us": us,
                },
                {
                    "name": "Bộ đồ",
                    "qz": qz,
                },
                {
                    "name": "Câu hỏi",
                    "qs": qs,
                },
                {
                    "name": "Đáp án",
                    "as": as,
                }
            ]

            if (i18n.language === 'en') {
                setDataChart(dataEng);
            } else {
                setDataChart(dataVie);
            }
        }

    }

    return (
        <div className='dashboard-container'>
            <div className='title'>
                {t('dashboard.title')}
            </div>
            <div className='main-content'>
                <div className='left-content'>
                    <div className='child'>
                        <span className='text-1'>{t('dashboard.total.user')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users && dataOverview.users.total ? dataOverview.users.total : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('dashboard.total.quiz')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz ? dataOverview.others.countQuiz : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('dashboard.total.question')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions ? dataOverview.others.countQuestions : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('dashboard.total.answer')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers ? dataOverview.others.countAnswers : 0}
                        </span>
                    </div>
                </div>
                <div className='right-content'>
                    <ResponsiveContainer width="100%" height="95%">
                        <BarChart data={dataChart}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="us" fill="#8884d8" />
                            <Bar dataKey="qz" fill="#82ca9d" />
                            <Bar dataKey="qs" fill="#ffc658" />
                            <Bar dataKey="as" fill="#ff7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;