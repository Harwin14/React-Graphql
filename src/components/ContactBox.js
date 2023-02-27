import { createContext, useState } from 'react';
import Contactform from './ContactForm';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';
export const ParamsContext = createContext();

export default function ContactBox() {
    const [params, setParams] = useState({
        page: 1,
        totalPages: 2,
        name: '',
        phone: '',
    });

    const [add, setAdd] = useState({
        isAdd: false,
    });

    const handleForm = () => {
        setAdd({
            isAdd: true,
        });
    };
    const handleCancel = () => {
        setAdd({
            isAdd: false,
        });
    };
    return (
        <div className='container-md'>
            <div className='card'>
                <div className='card-header'>
                    <h1>React-Graphql Phonebook</h1>
                </div>

                <ParamsContext.Provider value={{ params, setParams }}>
                    <div className='card-body'>
                        <button
                            type='button'
                            className='btn btn-info mx-4 px-4'
                            onClick={handleForm}
                        >
                            Add
                        </button>
                        {add.isAdd ? (
                            <Contactform cancelForm={handleCancel} />
                        ) : (
                            false
                        )}
                    </div>
                    <ContactSearch />
                    <ContactList />
                </ParamsContext.Provider>
            </div>
        </div>
    );
}
