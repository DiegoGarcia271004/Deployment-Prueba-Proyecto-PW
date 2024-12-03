import { createContext, useEffect, useState } from 'react';

export const FetchContext = createContext({
    checklist: [],
    handleFetchChecklist: () => { },
    form: [],
    handleFetchForm: () => { },
    consultants: [],
    handleFetchConsultants: () => { },
    users: [],
    handleFetchUsers: () => { },
    getID: () => {}
});

export const FetchProvider = ({ children }) => {
    
    const [checklist, setCheklist] = useState(() => {
        const savedChecklist = localStorage.getItem('checklist');
        return savedChecklist ? JSON.parse(savedChecklist) : [];
    });
    const [form, setForm] = useState(localStorage.getItem('form'), []);
    const [consultants, setConsultants] = useState(localStorage.getItem('consultant'), []);
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    useEffect(() => {

        if (checklist) {
            localStorage.setItem('checklist', JSON.stringify(checklist));
        } else {
            localStorage.removeItem('checklist');
        }

        if (form) {
            localStorage.setItem('form', form);
        } else {
            localStorage.removeItem('form');
        }

        if (consultants) {
            localStorage.setItem('consultant', consultants);
        } else {
            localStorage.removeItem('consultant');
        }
        if (users) {
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            localStorage.removeItem('users');
        }

    }, [checklist, form, consultants, users]);

    const handleFetchChecklist = (checklist, id) => {
        setCheklist(checklist);
        sessionStorage.setItem('checklistID', id);
    }

    const handleFetchForm = (form, id) => {
        setForm(form);
        sessionStorage.setItem('formID', id);
    }

    const handleFetchConsultants = (consultants, id) => {
        setConsultants(consultants);
        sessionStorage.setItem('consultantsID', id);
    }

    const handleFetchUsers = (users) => {
        setUsers(users);
    };

    const getID = (what) => {
        return sessionStorage.getItem(what);
    }

    return (
        <>
            <FetchContext.Provider value={{
                checklist,
                handleFetchChecklist,
                form,
                handleFetchForm,
                consultants,
                handleFetchConsultants,
                users,
                handleFetchUsers,
                getID
            }}>
                {children}
            </FetchContext.Provider>
        </>
    )
}